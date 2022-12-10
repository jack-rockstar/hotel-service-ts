import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { UserRoutes } from './user/user.router'
import { ConfigServer } from './config/config'

class Server extends ConfigServer {
  public app: express.Application = express()
  private readonly port: Number = this.getNumberEnv('PORT') ?? 8080

  constructor () {
    super()
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.dbConnect().then(() => {
      console.log('Conexion exitosa')
    }).catch((e: string) => {
      console.log(`Error de conexion: ${e}`)
    })

    this.app.use('/api/hotel', this.routes())

    this.listen()
  }

  routes (): express.Router[] {
    return [new UserRoutes().router]
  }

  public listen (): void {
    this.app.listen(this.port, () => {
      console.log(`server is running: ${String(this.port)}`)
    })
  }
}

const server = new Server()
console.log(server)
