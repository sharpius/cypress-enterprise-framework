import {Accessor} from "./Accessor";

export class LabelAccessor extends Accessor {
	public getText(): Cypress.Chainable<string> {
		return super.getElement().invoke('text');
	}
}