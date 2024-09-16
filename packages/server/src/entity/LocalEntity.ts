import EventEmitter, {EventData} from "../utils/EventEmitter";
import Entity from "./Entity";

export default class LocalEntity implements Entity {

    private topics = new EventEmitter()

    subscribe(topic: string, listener: Function) {
        this.topics.on(topic, listener)
    }

    unsubscribe(topic: string, listener?: Function) {
        this.topics.removeEventListener(topic)
    }

    publish(topic: string, data: EventData) {
        this.topics.emit(topic, data)
    }
}