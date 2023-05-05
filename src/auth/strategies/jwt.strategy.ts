import { Request } from 'express'
import { PayloadToken } from '../interfaces/auth.interface'
import { AuthService } from '../services/auth.service'
import { PassportUse } from '../utils/passport.use'
import { Strategy as JwtStr, StrategyOptions } from 'passport-jwt'

export class JwtStrategy extends AuthService {
  validate (payload: PayloadToken, done: any): any {
    return done(null, payload)
  }

  getJwtTokenStrategy: StrategyOptions = {
    jwtFromRequest: (req: Request) => {
      let token = null
      if (req !== null) {
        token = req.cookies.accessToken
      }
      return token
    },
    secretOrKey: this.getEnviroment('JWT_SECRET'),
    ignoreExpiration: false
  }

  readonly passportParams = this.getJwtTokenStrategy
  // readonly passportParams = {
  //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //   secretOrKey: this.getEnviroment('JWT_SECRET'),
  //   ignoreExpiration: false
  // }

  get use (): any {
    return PassportUse<
    JwtStr,
    StrategyOptions,
    (payload: PayloadToken, done: any) => Promise<PayloadToken>
    >(
      'jwt',
      JwtStr,
      this.passportParams,
      this.validate
      )
  }
}
