import {Accessor} from "../Accessor";


export abstract class UserInputAccessor extends Accessor {

	public mandatory: boolean = false;

	public click(): Cypress.Chainable {
		return this.getElement()
			.click();
	}

	public getValue(): Cypress.Chainable {
		return this.getElement()
			.invoke('val');
	}

	public isMandatory(): Cypress.Chainable<boolean> {
		return this.getElement()
			.wait(Cypress.env('visibilityTimeout') as number)
			.find('input')
			.should('have.attr', 'aria-required', 'true')
			.then(() => true);
	}
}