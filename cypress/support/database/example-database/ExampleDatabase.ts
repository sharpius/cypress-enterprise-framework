import {QueryHandler} from "../QueryHandler";
import {ExampleDatabaseSqlQueries} from "./ExampleDatabaseQueries";

export class ExampleDatabase extends QueryHandler {
    selectCustomer(customerNumber: string): Cypress.Chainable {
        return this.executeSQLQuery(ExampleDatabaseSqlQueries.selectCustomer(customerNumber));
    }
}