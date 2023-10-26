import {Accessor} from "./Accessor";


export class IconAccessor extends Accessor {
	public getIconType(): Cypress.Chainable<string> {
		return super.getElement().invoke('attr', 'icon');
	}

}