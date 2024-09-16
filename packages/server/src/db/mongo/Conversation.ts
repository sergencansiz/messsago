import {Conversation as ConversationModel, IConversation} from "./models";

export class Conversation {

    get(id: String){
        return ConversationModel.findOne(id)
    }

    add(data: IConversation){
        let conv = new ConversationModel(data)
        return conv
    }
}