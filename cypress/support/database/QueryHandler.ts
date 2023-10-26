import {IDatabaseSettings} from "./IDatabaseSettings";
import {IQuery} from "./IQuery";

export class QueryHandler {
    private isConfigured = false;
    protected databaseSettings?: IDatabaseSettings;

    constructor(
        protected executeSQLQueryWithSettings?: (query: IQuery, databaseSettings: IDatabaseSettings) => Cypress.Chainable
    ) {
    }

    protected executeSQLQuery(query: IQuery): Cypress.Chainable {
        if (!this.isConfigured || !this.databaseSettings) {
            throw new Error("Instance is not properly configured.");
        }
        return this.executeSQLQueryWithSettings(query, this.databaseSettings);
    }

    public static withExecutor<T extends typeof QueryHandler>(
        this: T,
        queryExecutor: (query: IQuery, databaseSettings: IDatabaseSettings) => Cypress.Chainable
    ): InstanceType<T> {
        return new this(queryExecutor) as InstanceType<T>;
    }

    public withSettings(databaseSettings: IDatabaseSettings): this {
        this.databaseSettings = databaseSettings;
        this.isConfigured = true;
        return this;
    }
}