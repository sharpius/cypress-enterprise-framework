import {IQuery} from "../IQuery";

export const ExampleDatabaseSqlQueries = {
    selectCustomer: (customerNumber: string): IQuery => ({
        query: `SELECT
                FROM customer
                WHERE customerNumber = ?`,
        parameters: [customerNumber]
    })
};