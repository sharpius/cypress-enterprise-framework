import {Accessor} from "./Accessor";

export class FileUploadAccessor extends Accessor {

    static override defaultSelector = () => '[data-cy="form-field-files"]'
    public errorSelector = "mat-error";
    public fileListSelector = "file-list";
    public fileRowSelector = "file-list__row";
    public fileNameSelector = "div.fx-column > span:first-child";

    public uploadFile(fileToUpload: string): Cypress.Chainable {
        return super.getElement()
            .find('input[type="file"]')
            .invoke('show')
            .attachFile(`upload-files/${fileToUpload}`)
            .trigger('input');
    }

    public getError(): Cypress.Chainable {
        return super.getElement()
            .find(this.errorSelector)
    }

    public getFileList(): Cypress.Chainable {
        return super.getElement()
            .then(($element) => {
                if ($element.find(this.fileListSelector).length) {
                    return cy.wrap($element).find(this.fileListSelector).find(this.fileRowSelector);
                }
                return cy.wrap(null);
            });
    }

    public getFileNames(): Cypress.Chainable {
        return this.getFileList()
            .find(this.fileNameSelector)
    }
}