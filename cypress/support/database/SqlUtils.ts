import {IDatabaseSettings} from "./IDatabaseSettings";
import {IQuery} from "./IQuery";

/**
 * Since the microservice architecture can use databases from different providers in its different parts,
 * at this point we can define the individual executors for each DB provider.
 */
export const mariaDbExecutor = (queryWithParameters: IQuery, databaseSettings: IDatabaseSettings): Cypress.Chainable => {
    return cy.task('connectMariaDb', {...queryWithParameters, databaseSettings});
};
