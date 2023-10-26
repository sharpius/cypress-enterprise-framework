import {IQuery} from "../IQuery";

export const ExampleDatabaseSqlQueries = {
    selectCustomer: (customerNumber: string): IQuery => ({
        query: `SELECT
                FROM customers
                WHERE customerNumber = ?`,
        parameters: [customerNumber]
    })
};