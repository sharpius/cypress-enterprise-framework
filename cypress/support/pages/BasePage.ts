export abstract class BasePage {
    public url: string;

    visit(): this {
        if (!this.url) throw new Error('No URL specified.');
        cy.visit(this.url);
        return this;
    }

    waitForLoad(): this {
        cy.get('mat-spinner').should('not.exist');
        return this;
    }
}

