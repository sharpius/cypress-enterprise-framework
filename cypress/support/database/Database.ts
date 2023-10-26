import {mariaDbExecutor} from "./SqlUtils";
import {ExampleDatabase} from "./example-database/ExampleDatabase";

export class Database {
    private static defaultSettings = {
        username: "[username]",
        password: "[password]",
        host: "[host]"
    };


    static readonly exampleDatabase = ExampleDatabase.withExecutor(mariaDbExecutor)
        .withSettings({...this.defaultSettings, database: "example_database"});
}