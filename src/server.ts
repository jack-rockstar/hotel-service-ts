import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { UserRoutes } from './user/user.router'
import { ConfigServer } from './config/config'
import { RoomRoutes } from './room/room.router'
import { RoomTypeRoutes } from './roomType/roomType.router'
import { DataSource } from 'typeorm'
import { RentalRoutes } from './rental/rental.router'
import { GuestRoutes } from './guest/guest.router'
import { BillingRoutes } from './billing/billing.router'
import { VoucherRoutes } from './voucher/voucher.router'
import { LoginStrategy } from './auth/strategies/login.strategy'
import { JwtStrategy } from './auth/strategies/jwt.strategy'

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
    this.passportUser()
    // this.listen()
  }

  routes (): express.Router[] {
    return [new UserRoutes().router,
      new RoomRoutes().router,
      new RoomTypeRoutes().router,
      new RentalRoutes().router,
      new GuestRoutes().router,
      new BillingRoutes().router,
      new VoucherRoutes().router
    ]
  }

  passportUser (): any {
    return [new LoginStrategy().use, new JwtStrategy().use]
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
