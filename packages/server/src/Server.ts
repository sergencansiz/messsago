import {Server as HttpServer} from "http";
import {Server, WebSocket } from "ws";
import {WSClient} from "./WSClient";
import Entity from "./entity/Entity";
import LocalEntity from "./entity/LocalEntity"
import {DB} from "./db/db";


export type WebSocketClient = WebSocket

export interface ServerOptions  {
    port?: number
    host?: string
    server: HttpServer
    entity?: Entity
    db?: DB
}

export class MessagoServer {

    /**
     *
     * @protected
     */
    protected port: number

    /**
     *
     * @protected
     */
    protected host: string


    protected server: HttpServer


    protected clients: WSClient[] = []


    protected websocket: Server


    protected entity: Entity

    
    protected db: DB | undefined

    constructor(options: ServerOptions) {
        this.server = options.server
        this.port = options.port ? options.port : 8080
        this.host = options.host ? options.host : 'localhost'
        this.websocket = new Server({ noServer: true })
        this.db = options.db
        this.entity = options.entity || new LocalEntity()
    }

    /**
     * Run MessagoServer
     */
    public run = async () => {

        // Connect to database
        if(this.db)
            await this.db.connect()

        // Registers WSClient hooks
        this.register_hooks()

        // Start server
        this.start_server()
    }

    /**
     *
     */
    private register_hooks = () => {

        // WebSocket connection event
        this.websocket.on('connection', (socket: any) => {
            let client = new WSClient(socket, this.entity)
            this.clients.push(client)
        })

        this.websocket.on('error', (error => {
            console.log(error)
        }))
    }

    /**
     * Starts server
     */
    private start_server = () => {

        const headers = [
            'HTTP/1.1 101 Web Socket Protocol Handshake',
            'Upgrade: WebSocket',
            'Connection: Upgrade',
            ''
        ].map(line => line.concat('\r\n')).join('')

        // HTTP server upgrade
        this.server.on('upgrade' , ( req: any, socket: any,  head:any ) => {
            this.websocket.handleUpgrade( req , socket, head, (socket: WebSocket)  => {
                this.websocket.emit('connection', socket, req)
            })
        })

        // Listen server
        this.server.listen(this.port, () : void => {
            console.log(`Server haas started on port ${this.port}`)
        })
    }
}