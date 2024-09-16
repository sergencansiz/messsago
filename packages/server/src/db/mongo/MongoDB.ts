import {DB} from "../db";
import {connect} from "mongoose";
import {Conversation} from "./Conversation";

export class MongoDB implements DB {

    protected uri: string

    public conversation: Conversation = new Conversation()

    constructor(uri: string) {
        this.uri = uri
    }

    async connect(){
        await connect(this.uri)
    }


}