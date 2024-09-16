

abstract class Conversation {
    abstract add(conversation: Object): Promise<Object>;
}

abstract class User {
    abstract auth(token: string): Promise<Object>;
}




