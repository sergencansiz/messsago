
export default interface Entity {
    subscribe(topic: String, listener: Function ): void
    unsubscribe(topic: String, listener?: Function): void
    publish(topic: String, data: any ): void
}