export const AmqpUtils = {
    rabbitMqPublish: (exchange: string, routingKey: string, messageContent: string = ""): Cypress.Chainable => {
        console.log(`Publishing to exchange: ${exchange}, routing key: ${routingKey}, message: ${messageContent}`);

        return cy.task('publishToExchange', {
            exchange: exchange,
            routingKey: routingKey,
            messageContent: messageContent
        });
    }
}