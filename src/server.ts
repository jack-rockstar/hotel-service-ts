import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { UserRoutes } from './user/user.router'
import { ConfigServer } from './config/config'
import { RoomRoutes } from './room/room.router'
import { RoomTypeRoutes } from './roomType/roomType.router'
import { DataSource } from 'typeorm'

export class Server extends ConfigServer {
  public app: express.Application = express()
  private readonly port: Number = this.getNumberEnv('PORT') ?? 8080

  constructor () {
    super()
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.dbConnect()
      .then(() => console.log('Connection true'))
      .catch((e: string) => console.error(`Connection false: ${e}`))

    this.app.use('/api/hotel', this.routes())
    // this.listen()
  }

  routes (): express.Router[] {
    return [new UserRoutes().router,
      new RoomRoutes().router,
      new RoomTypeRoutes().router
    ]
  }

  async dbConnect (): Promise<DataSource | any> {
    return await this.initConnect
  }

  public listen (): void {
    this.app.listen(this.port, () => {
      console.log(`server is running: ${String(this.port)}`)
    })
  }
}
