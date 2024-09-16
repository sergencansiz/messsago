import {Schema, model, Types} from 'mongoose';



/**
 * Interface for conversation
 */
export interface IConversation {
    clients: Types.Array<string>;
}

/**
 * Interface for user objects
 */
export interface IUser {
    name: string
    last_token: string
    email: string
}

/**
 * Interface for messages
 */
export interface IMessages {
    conversation_id: String
    content: String
    from: String
}


/**
 * MongoDB schema for sıngle User entry
 */
const userSchema  = new Schema<IUser>({
    name: { type: String, required: true  },
    email: { type: String, required: true }
})
export const User = model<IUser>('User', userSchema)


/**
 * MongoDB schema for single conversation
 */
const conversationSchema = new Schema<IConversation>({
    clients: { type: [String], required: true}
})

export const Conversation = model<IConversation>('Conversation', conversationSchema)


/**
 * MongoDB Schema for messages
 */
const messageSchema = new Schema<IMessages>({
    conversation_id: {type: String, required: true},
    content: {type: String, required: true},
    from: {type: String, required: true}
})

export const Message = model<IMessages>('Message', messageSchema)
