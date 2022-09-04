import {Server as HttpServer} from "http";
import {Server, WebSocket } from "ws";

export type WebSocketClient = WebSocket

export interface ServerOptions  {
    port?: number
    host?: string
    server: HttpServer
}

export class MessagoServer {

    protected port: number
    protected host: string
    protected server: HttpServer

    constructor(options: ServerOptions) {
        this.server = options.server
        this.port = options.port ? options.port : 8080
        this.host = options.host ? options.host : 'localhost'
    }

    /**
     * Run MessagoServer
     */
    public run = () => {
        console.log('HEYYYYY')
        const id = Date.now()
        const headers = [
            'HTTP/1.1 101 Web Socket Protocol Handshake',
            'Upgrade: WebSocket',
            'Connection: Upgrade',
            ''
        ].map(line => line.concat('\r\n')).join('')

        const ws = new Server({ noServer: true })

        // WebSocket connection event
        ws.on('connection', (socket: any) => {
            socket.on('message', (message: string) => console.log(message));
        })


        // HTTP server upgrade
        this.server.on('upgrade' , ( req: any, socket: any,  head:any ) => {
            ws.handleUpgrade( req , socket, head, (socket: WebSocket)  => {
                ws.emit('connection', socket, req)
            })
        })

        // Listen server
        this.server.listen(this.port, () : void => {
            console.log(`Server haas started on port ${this.port}`)
        })
    }
}