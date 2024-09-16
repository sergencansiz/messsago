import {IncomingMessage, ServerResponse} from "http";

// Type for request and response callback
type RequestCallback = (req: IncomingMessage, res: ServerResponse) => void;

export default class Router {

    private routes: Map<string, Map<string, RequestCallback>> = new Map;


    /**
     * Set callback function for given path for get method
     * @param path
     * @param callback
     */
    public get = (path: string, callback:RequestCallback): void => {
        this.routes.get(path)?.set('get', callback) ||
        this.routes.set(path, new Map().set('get', callback))
    }


    /** Set callback function for given path for `post` method
    * @param path
    * @param callback
    */
    public post = (path: string, callback:RequestCallback ): void => {
        this.routes.get(path)?.set('post', callback) ||
        this.routes.set(path, new Map().set('post', callback))
    }


}




