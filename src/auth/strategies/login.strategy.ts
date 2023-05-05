import { UserEntity } from '../../user/entities/user.entity'
import { AuthService } from '../services/auth.service'
import { PassportUse } from '../utils/passport.use'
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local'

const authService: AuthService = new AuthService()

export class LoginStrategy {
  async validate (
    username: string,
    password: string,
    done: any
  ): Promise<UserEntity> {
    const userData = await authService.validateUser(username, password)
    if (userData === false) {
      return done(null, false, { message: 'Invalid user or password' })
    }

    return done(null, userData)
  }

  readonly passportParams = {
    usernameField: 'username',
    passwordField: 'password'
  }

  get use (): any {
    return PassportUse<LocalStrategy, Object, VerifyFunction>(
      'login',
      LocalStrategy,
      this.passportParams,
      this.validate
    )
  }
}
