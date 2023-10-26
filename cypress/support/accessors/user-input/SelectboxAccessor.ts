
import {InputboxAccessor} from "./InputboxAccessor";

export class SelectboxAccessor extends InputboxAccessor {
    public autocompleteSelector = "mat-autocomplete";

    public fillAndSelectOption(textToSelect: string) {
        return this.fill(textToSelect).getElement().then(() => {
            return cy.get(`[id^="${this.autocompleteSelector}-"]`, {timeout: 30000}).contains(textToSelect).first().click();
        });
    }
}