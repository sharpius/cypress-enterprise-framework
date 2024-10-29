import {defineConfig} from "cypress";
import {MariaDbConnectionHandler} from "./cypress/support/database/MariaDbConnectionHandler";
import {RabbitPublisher} from "./cypress/support/amqp/RabbitMqPublisher";

const mariaDbConnectionHandler = new MariaDbConnectionHandler();
const rabbitPublisher = new RabbitPublisher();

export default defineConfig({
    e2e: {
        baseUrl: "https://www.google.com",

        setupNodeEvents(on, config) {
            on("task", {
                async connectMariaDb({query, parameters, databaseSettings}) {
                    try {
                        return await mariaDbConnectionHandler.query(databaseSettings, query, parameters);
                    } catch (err) {
                        console.log(err);
                        throw new Error("DB connection was not successful");
                    }
                },

                async publishToExchange({exchange, routingKey, messageContent}) {
                    try {
                        return await rabbitPublisher.publishToExchange(routingKey, messageContent, exchange);
                    } catch (err) {
                        console.log(err);
                        throw new Error("Message was not published");
                    }
                }
            })
        },
    },
});
