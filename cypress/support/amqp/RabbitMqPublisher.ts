import {IRabbitMqSettings} from "./IRabbitMqSettings";
import axios from "axios";


export class RabbitPublisher {
    public constructor(private readonly settings: IRabbitMqSettings = {
        host: "localhost",
        port: 15672,
        username: "guest",
        password: "password"
    }) {
    }

    public async publishToExchange(routingKey: string, messageContent: string, exchange: string) {
        const url = `http://${this.settings.host}:${this.settings.port}/api/exchanges/%2F/${exchange}/publish`;
        const body = this.getRequestBody(routingKey, messageContent, exchange);
        const headers = this.getHeaders();


        const response = await axios.post(url, body, {headers: headers});
        console.log(`Sent message with routing key '${routingKey}' to exchange '${exchange}'`);

        if ([200, 201, 202].includes(response.status)) {
            if (response.data.routed) {
                return response.data;
            } else {
                throw new Error(`Message was not routed: ${response.data}`);
            }
        } else {
            throw new Error(`Rabbit responded with status code: ${response.status}`);
        }
    }

    public async publishToTriggering(routingKey: string, messageContent: string) {
        return this.publishToExchange(routingKey, messageContent, "triggering");
    }

    private getRequestBody(routingKey: string, messageContent: string, exchange: string) {
        return {
            vhost: "/",
            name: exchange,
            properties: {
                delivery_mode: 2,
                headers: {}
            },
            routing_key: routingKey,
            delivery_mode: "2",
            payload: messageContent,
            payload_encoding: "string",
            headers: {},
            props: {}
        };
    }

    private getHeaders() {
        const credentials = Buffer.from(`${this.settings.username}:${this.settings.password}`)
            .toString('base64');
        return {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        };
    }
}