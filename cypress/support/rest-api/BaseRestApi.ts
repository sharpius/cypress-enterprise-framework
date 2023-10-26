import {THttpMethod} from "./THttpMethod";

export abstract class BaseApi {
    baseUrl: string = Cypress.config('baseUrl');
    headers: IHttpHeaders = {'Content-Type': 'application/json'};

    private wait(alias: string) {
        cy.wait(200);
        return cy.wait('@' + alias, {timeout: 50000});
    }

    private intercept(method: THttpMethod,
                      path: string, alias: string): Cypress.Chainable {
        return cy.intercept(method, path)
            .as(alias);
    }

    protected interceptAndWait(method: THttpMethod,
                               path: string, alias: string) {
        let interception = this.intercept(method, path, alias);
        return {
            interception: interception,
            wait: () => this.wait(alias)
        };
    }

    private sendRequest(method: THttpMethod, path: string, body?: any,
                        failOnStatusCode: boolean = true, headers: IHttpHeaders = this.headers): Cypress.Chainable {
            return cy.request({
                method,
                url: this.baseUrl + path,
                body,
                headers
            });
    }

    protected getRequest(path: string, failOnStatusCode: boolean = true, headers = this.headers): Cypress.Chainable {
        return this.sendRequest('GET', path, undefined, failOnStatusCode, headers);
    }

    protected postRequest(path: string, body: any, failOnStatusCode: boolean = true,
                          headers = this.headers): Cypress.Chainable {
        return this.sendRequest('POST', path, body, failOnStatusCode, headers);
    }

    protected putRequest(path: string, body: any, failOnStatusCode: boolean = true,
                         headers = this.headers): Cypress.Chainable {
        return this.sendRequest('PUT', path, body, failOnStatusCode, headers);
    }

    protected deleteRequest(path: string, body?: any, failOnStatusCode: boolean = true,
                            headers = this.headers): Cypress.Chainable {
        return this.sendRequest('DELETE', path, body, failOnStatusCode, headers);
    }

    protected buildQueryString(params: Record<string, string | number | boolean>): string {
        try {
            const url = Cypress.config("baseUrl");
            let builtUrl = new URL(url);

            for (let [key, value] of Object.entries(params)) {
                builtUrl.searchParams.set(key, value.toString());
            }
            return builtUrl.search;
        }
        catch (error) {
            console.error("Invalid path.");
            return null;
        }
    }
}