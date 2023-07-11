import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { UserRoutes } from './user/user.router'
import { ConfigServer } from './config/config'
import { RoomRoutes } from './room/room.router'
import { RoomTypeRoutes } from './roomType/roomType.router'
import { DataSource } from 'typeorm'
import { RentalRoutes } from './rental/rental.router'
import { GuestRoutes } from './guest/guest.router'
import { BillingRoutes } from './billing/billing.router'
import { VoucherRoutes } from './voucherType/voucherType.router'
import { LoginStrategy } from './auth/strategies/login.strategy'
import { JwtStrategy } from './auth/strategies/jwt.strategy'
import { AuthRoutes } from './auth/auth.routes'
import { AuthMiddleware } from './shared/middlewares/auth.middleware'

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
