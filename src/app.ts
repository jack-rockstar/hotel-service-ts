import { Server } from './server'

const servidor: Server = new Server()

console.log(process.cwd())
servidor.listen()
