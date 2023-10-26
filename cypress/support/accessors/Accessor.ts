export class Accessor {
	static defaultSelector = () => "";
	private _defaultVisible: boolean = true;

	constructor(public selector: string) {
	}

	public static withSelector<T extends typeof Accessor>(this: T, selector: string): InstanceType<T> {
		return new this(selector) as InstanceType<T>;
	}

	public static withDefaultSelector<T extends typeof Accessor>(this: T): InstanceType<T> {
		return new this(this.defaultSelector()) as InstanceType<T>;
	}

	public static withParentSelector<T extends typeof Accessor>(this: T, parentSelector: string, childSelector: string = this.defaultSelector()): InstanceType<T> {
		const selector = `${parentSelector} ${childSelector}`;
		return new this(selector) as InstanceType<T>;
	}

	public withDefaultVisibility(isVisible: boolean = true): this {
		this._defaultVisible = isVisible;
		return this;
	}


	public getElement(): Cypress.Chainable {
		return cy.get(this.selector);
	}

	public isVisible(): Cypress.Chainable<boolean> {
		return this.getElement()
			.wait(Cypress.env('visibilityTimeout') as number)
			.then(element => {
				const isDisplayed = element.css('display') !== 'none';
				const isHidden = element.css('visibility') == 'hidden';
				return isDisplayed && !isHidden;
			});
	};
}