import {UserInputAccessor} from "./UserInputAccessor";


export class DropdownAccessor extends UserInputAccessor {

    private _option: string;
    private optionSelector = "mat-option";

    public open(): this {
        this.getElement().click();
        return this;
    }

    public getOptionByText(text: string): this {
        this._option = text;
        return this;
    }

    public override click(): Cypress.Chainable {
        return cy.get(`${this.optionSelector}:contains(${this._option})`).first().click();
    }

    public override getValue(): Cypress.Chainable {
        return cy.get(`${this.optionSelector}:contains(${this._option})`).invoke('text');
    }

    public getAllOptions(): Cypress.Chainable {
        return cy.get(this.optionSelector);
    }
}