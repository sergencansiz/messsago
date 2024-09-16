import {WebSocketClient} from "./Server";
import {randomUUID} from "crypto";
import Validator from "./utils/validator";
import Controller from "./Controller";
import Entity from "./entity/Entity";

type WSClientErrorMessage = {
    t: string,
    m: string
}

export class WSClient {

    public id: string
    public client: WebSocketClient

    private validator: Validator
    private MController: Controller = new Controller()

    protected entity: Entity

    constructor(client: WebSocketClient, entity: Entity) {
        this.id = randomUUID()
        this.client = client
        this.validator = new Validator()
        this.entity = entity

        // Register message handler for client
        this.client.on('message', this.onMessageHandler)
        this.client.on('close', this.onDisconnectHandler)
    }

    /**
     * Handler for client each time receives a data from remote client
     * @param message {string}
     */
    private onMessageHandler = (message: Buffer) => {

        let data = this.validator.validate(message, this.send_error)

        this.entity.publish("message", data)
    }

    /**
     * Handler for client disconnect
     */
    private onDisconnectHandler = (event: number, reason: Buffer) => {
        console.log('Client disconnected')
        console.log(event, reason.toString())
    }

    /**
     *
     * @param message
     */

    private send = (message: Object | WSClientErrorMessage) => {
        let m = JSON.stringify(message)
        this.client.send(m)
    }

    /**
     *
     * @param message
     */
    private send_error = (message: string) => {
        this.send({t: "error" , m: message})
    }

}