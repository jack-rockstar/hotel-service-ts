import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { AuthRoutes } from './auth/auth.routes'
import { JwtStrategy } from './auth/strategies/jwt.strategy'
import { LoginStrategy } from './auth/strategies/login.strategy'
import { BillingRoutes } from './billing/billing.router'
import { ConfigServer } from './config/config'
import { GuestRoutes } from './guest/guest.router'
import { RentalRoutes } from './rental/rental.router'
import { RoomRoutes } from './room/room.router'
import { RoomTypeRoutes } from './roomType/roomType.router'
import { AuthMiddleware } from './shared/middlewares/auth.middleware'
import { UserRoutes } from './user/user.router'
import { VoucherRoutes } from './voucherType/voucherType.router'

export class Server extends ConfigServer {
  private readonly middlewareAuth: AuthMiddleware = new AuthMiddleware()
  public app: express.Application = express()
  private readonly port: Number = this.getNumberEnv('PORT') ?? 8080

  constructor() {
    super()
    this.app.use(cookieParser())
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
    this.app.use('/', this.unProtectedRoutes())
    this.app.use(this.middlewareAuth.passAuth('jwt'))
    this.passportUser()
    this.dbConnect()
      .then(() => console.log('Connection true'))
      .catch((e: string) => console.error(`Connection false: ${e}`))

    this.app.use('/api/hotel', this.protectedRoutes())
    // this.listen()
  }

  protectedRoutes(): express.Router[] {
    return [new UserRoutes().router,
    new RoomRoutes().router,
    new RoomTypeRoutes().router,
    new RentalRoutes().router,
    new GuestRoutes().router,
    new BillingRoutes().router,
    new VoucherRoutes().router
    ]
  }

  unProtectedRoutes(): express.Router[] {
    return [new AuthRoutes().router]
  }

  passportUser(): any[] {
    return [new LoginStrategy().use, new JwtStrategy().use]
  }

  async dbConnect(): Promise<DataSource | any> {
    return await this.initConnect
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`server is running: ${String(this.port)}`)
    })
  }
}
