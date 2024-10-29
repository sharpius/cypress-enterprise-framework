/**
 *  Represents an abstract base for creating more specific accessor components in testing framework.
 */
export class Accessor {
	static readonly defaultSelector = () => "";

	public constructor(public selector: string) {
	}

	/**
	 * withSelector static method creates a new instance of the class it's called on (or a subclass thereof), using the selector string.
	 * @param selector The CSS selector of targeting page element.
	 */
	public static withSelector<T extends typeof Accessor>(this: T, selector: string): InstanceType<T> {
		return new this(selector) as InstanceType<T>;
	}

	/**
	 * withDefaultSelector static method creates a new instance of the class it's called on (or a subclass thereof), using the default selector.
	 */
	public static withDefaultSelector<T extends typeof Accessor>(this: T): InstanceType<T> {
		return new this(this.defaultSelector()) as InstanceType<T>;
	}

	public static withParentSelector<T extends typeof Accessor>(this: T, parentSelector: string,
																childSelector: string = this.defaultSelector()): InstanceType<T> {
		const selector = `${parentSelector} ${childSelector}`;
		return new this(selector) as InstanceType<T>;
	}

	/**
	 * withChildSelector static method identifies parent using child selector and parent selector
	 * @param parentSelector common parent
	 * @param childSelector unique identifier of child
	 */
	public static withChildSelector<T extends typeof Accessor>(this: T, parentSelector: string,
															   childSelector: string): InstanceType<T> {
		const selector = `${parentSelector}:has(${childSelector})`;
		return new this(selector) as InstanceType<T>;
	}


	public getElement(): Cypress.Chainable {
		return cy.get(this.selector);
	}

	public expectIsVisible(): Cypress.Chainable<boolean> {
		return this.getElement().should((element) => {
			if (element.length > 0) {
				const isDisplayed = element.css('display') !== 'none';
				const isHidden = element.css('visibility') === 'hidden';
				return expect(isDisplayed && !isHidden, "element should be visible").be.true;
			}
			return expect(element).exist;
		});
	}

	public expectIsHidden(): Cypress.Chainable<boolean> {
		return this.getElement().should((element) => {
			if (element.length > 0) {
				const notDisplayed = element.css('display') === 'none';
				const isHidden = element.css('visibility') === 'hidden';
				return expect(notDisplayed || isHidden, "element should be hidden").be.true;
			}
			return expect(element).not.exist;
		});
	}

	public retryAssert<T>(action: () => Cypress.Chainable<T>, validate: (value: T) => boolean, maxRetries: number = 3, retryDelay: number = 1000): Cypress.Chainable {
		const tryAssertion = (remainingRetries: number): Cypress.Chainable => {
			return action().then((value) => {
				if (validate(value)) {
					return cy.wrap(value);
				} else if (remainingRetries > 0) {
					cy.wait(retryDelay);
					return tryAssertion(remainingRetries - 1);
				} else {
					throw new Error(`Assertion failed after ${maxRetries} retries`);
				}
			});
		};
		return tryAssertion(maxRetries);
	}
}
