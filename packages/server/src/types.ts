/**
 * Type for data in the message
 */
export type MessageData = {
    m: string
    t: any
    c: string
    f: string
    k?: string
}

/**
 * Type for message
 */
export type Message = {
    t: string
    d: MessageData
}