import {UserInputAccessor} from "./UserInputAccessor";

export class InputboxAccessor extends UserInputAccessor {
    public errorSelector =  "mat-error";

    public override click(): Cypress.Chainable {
        return this.getElement().find("input").click();
    }

    public fill(text: string): this {
        this.getElement().find("input").type(text, {force: true});
        return this;
    }

    public clear(): this {
        this.getElement().find("input").clear();
        return this;
    }

    public getLabel(): Cypress.Chainable {
        return this.getElement().find("label");
    }

    public override getValue(): Cypress.Chainable<string> {
        return this.getElement().find("input").invoke('val');
    }

    public getErrorValue(): Cypress.Chainable<string> {
        return this.getElement().find(this.errorSelector).invoke('val');
    }
}