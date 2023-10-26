import {Accessor} from "./Accessor";

export class NotificationAccessor extends Accessor {

    static override defaultSelector = () => '#toast-container';

    public getText(): Cypress.Chainable<string> {
        return cy.get(this.selector, {timeout: 20000}).find('[role="alert"]', {timeout: 20000})
            .invoke('text');
    }
}