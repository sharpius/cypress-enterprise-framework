import { defineConfig } from "cypress";
import {MariaDbConnectionHandler} from "./cypress/support/database/MariaDbConnectionHandler";

const mariaDbConnectionHandler = new MariaDbConnectionHandler();
export default defineConfig({
  e2e: {
    baseUrl: "www.myAwesomeWebsite.com",

    setupNodeEvents(on, config) {
      on("task", {
        async connectMariaDb({query, parameters, databaseSettings}) {
          try {
            return await mariaDbConnectionHandler.query(databaseSettings, query, parameters);
          }
          catch (err) {
            console.log(err);
            throw new Error("DB connection was not successful");
          }
        }
      })
    },
  },
});
