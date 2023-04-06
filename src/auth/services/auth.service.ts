import { ConfigServer } from '../../config/config'
import { UserService } from '../../user/services/user.service'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { UserEntity } from '../../user/entities/user.entity'
import { PayloadToken } from '../interfaces/auth.interface'

export class AuthService extends ConfigServer {
  constructor (private readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt) {
    super()
  }

  public async validateUser (user: string, password: string): Promise<UserEntity | Boolean> {
    const userByEmail = await this.userService.findUserByEmail(user)
    const userByName = await this.userService.findUserByUser(user)

    if (userByName != null) {
      const isMatch = await bcrypt.compare(password, userByName.password)
      return isMatch && userByName
    }

    if (userByEmail != null) {
      const isMatch = await bcrypt.compare(password, userByEmail.password)
      return isMatch && userByEmail
    }

    return false
  }

  sign (payload: jwt.JwtPayload, secret: any): any {
    return this.jwtInstance.sign(payload, secret, { expiresIn: '1h' })
  }

  public async generateJWT (user: UserEntity): Promise<{ accessToken: string, user: UserEntity }> {
    const userConsult = await this.userService.findUserWithRole(user.id, user.role)
    const payload: PayloadToken = {
      role: userConsult?.role,
      sub: userConsult?.id
    }

    if (userConsult != null) {
      user.password = 'Not permission'
    }

    return {
      accessToken: this.sign(payload, this.getEnviroment('JWT_SECRET')),
      user
    }
  }
}
