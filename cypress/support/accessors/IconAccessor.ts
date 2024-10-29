import {Accessor} from "./Accessor";


export class IconAccessor extends Accessor {
	public getIconType(): Cypress.Chainable<string> {
		return this.getElement().invoke('attr', 'icon');
	}

}