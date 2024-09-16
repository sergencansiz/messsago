import http from "http";
import {MessagoServer, MongoDriver} from "@messago/server";
import dotenv from "dotenv"

// Read .env file
dotenv.config()

const server = http.createServer()
console.log(process.env.DB_URI)
console.log(process.env)
const db = new MongoDriver(process.env.DB_URI || '')



const messago = new MessagoServer({server: server, db: db})

messago.run()

