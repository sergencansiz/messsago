/*
import * as http from "http";
import Router from './Router';


// Request callback
type RequestCallback = (req: http.IncomingMessage, res: http.ServerResponse) => void;


export class HttpServer extends http {

    public port: number = 8081;
    public host: string = '0.0.0.0';
    private server: null | http.Server = null;
    private routes: Map<string, Router> = new Map;

    /!**
     * Register new router for the router
     * @param path
     * @param router
     *!/
    public route = (path: string, router: Router ): void => {

    }

    private routeRequest = (req: http.IncomingMessage, res:http.ServerResponse) => {
        // @ts-ignore
        let url = new URL(req.url)
    }

    private register_route = (): void | null => {
        return null
    }

    private remove_route = (): void | null => {
        return null
    }

    /!**
     * Run http server
     *!/
    public run = (): http.Server => {
        this.server = http.createServer(
            (req : http.IncomingMessage, res: http.ServerResponse): void => {
            this.routeRequest(req,res)
        })

        this.server.listen(this.port, this.host)

        return(this.server)
    }
}*/
