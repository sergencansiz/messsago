/**
 *
 */
export type EventData = {[key: string] : String | number }

/**
 *
 */
export type TEvents = {[key: string] : Set<Function>}


/**
 * Custom event emitter for LocalPresence
 */
export default class EventEmitter {

    private readonly events: TEvents

    constructor() {
        this.events = {}
    }

    /**
     *
     * @param type
     * @param listener
     */
    public on(type: string, listener: Function) {
        this.events[type] = this.events[type] || new Set<() => void>()
        this.events[type].add(listener)
    }

    /**
     * Execute event once
     * @param type
     * @param listener
     */
    public once(type: string, listener: (data: EventData) => void ) {

        const self = this
        function onceFunc(data: EventData){
            self.removeEventListener(type)
            listener(data)
        }
        this.on(type, onceFunc)
    }

    /**
     *
     * @param type
     * @param data
     */
    public emit(type: string, data: EventData){

        if(this.events[type]){
            this.events[type].forEach( (value) => {
                value.apply(null, [data])
            })
        }
    }

    removeEventListener(type: string) {
        delete this.events[type]
    }
}