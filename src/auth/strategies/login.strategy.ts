import { UserEntity } from '../../user/entities/user.entity'
import { AuthService } from '../services/auth.service'
import { PassportUse } from '../utils/passport.use'
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local'

const authService: AuthService = new AuthService()

export class LoginStrategy {
  public async validate (user: string, password: string, done: any): Promise<UserEntity> {
    const userDate = await authService.validateUser(user, password)

    if (userDate !== true) {
      return done(null, false, { message: 'Invalid user or password' })
    }

    return done(null, userDate)
  }

  get use (): any {
    return PassportUse<LocalStrategy, Object, VerifyFunction>('login', LocalStrategy, {
      userField: 'user',
      passwordField: 'password'
    }, this.validate)
  }
}
