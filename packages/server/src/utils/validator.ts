const messageDataTag: unique symbol = Symbol("MessageDataTag");
const messageTag: unique symbol = Symbol("MessageTag");

/**
 * Type for data in the message
 */
type MessageData = {
    m: string
    t: string
    e: any
}

/**
 * Type for message
 */
type Message = {
    t: string
    d: MessageData
}

type ValidatorResult = {
    status: boolean
    data: Message
}


class Validator {


    private messageTypes: string[] = ["message", "file", "sound"]


    /**
     * Validates message
     * @param data {Buffer}
     * @param onError {Function}
     */
    public validate = (data: Buffer, onError: Function): Message | null => {

        try {
           return this.validate_schema(
               this.validate_json(data)
            )
        }catch (e: any){
            onError(e)
        }

        return null
    }


    /**
     * Validate whether given buffer type is JSON serializable
     * @param data {Buffer}
     */
    private validate_json = (data: Buffer) : Message => {
        try {
            return JSON.parse(data.toString())
        }
        catch (e) {
            throw 'Received data is not JSON serializable'
        }
    }

    /**
     * Validate whether data had valid format
     * @param data {Message}
     */
    private validate_schema = (data: Message) => {

        if('t' in data && typeof data.t === "string" &&
            'd' in data && typeof data.d === "object"
        ){
            if(this.messageTypes.includes(data.t)){
                return data
            }

            throw  'Invalıd message type.'
        }else{
            throw 'Message data is not well formatted'
        }
    }
}

export default Validator