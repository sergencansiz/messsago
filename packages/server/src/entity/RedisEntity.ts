import Entity from "./Entity";

export default class RedisEntity implements Entity {

    constructor() {

    }

    subscribe(topic: String, listener: Function) {
    }

    unsubscribe(topic: String, listener?: Function) {
    }

    publish(topic: String, data: any) {
    }

}