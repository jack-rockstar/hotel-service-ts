import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { ConfigServer } from '../../config/config'
import { UserEntity } from '../../user/entities/user.entity'
import { UserService } from '../../user/services/user.service'
import { PayloadToken } from '../interfaces/auth.interface'

export class AuthService extends ConfigServer {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt
  ) {
    super()
  }

  public async validateUser(user: string, password: string): Promise<UserEntity | Boolean> {
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

  sign(payload: jwt.JwtPayload, secret: any): any {
    return this.jwtInstance.sign(payload, secret, { expiresIn: '1h' })
  }

  refreshToken(token: any) {
    try {
      const usuario = this.extractTokenData(token)
      const user = {
        role: usuario.role,
        id: usuario.sub
      }
      const payload: PayloadToken = this.payloadToken(user)
      const accessToken = this.sign(payload, this.getEnviroment('JWT_SECRET'))
      return {
        accessToken,
        user: user
      }
    } catch (error) {
      console.log(`Error refreshToken: ${error}`)
      return null
    }

  }

  private extractTokenData(token: string): PayloadToken {
    const tokenParts = token.split('.')
    if (tokenParts.length !== 3) {
      throw new Error('Token inválido')
    }

    const payloadBase64 = tokenParts[1]
    const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8')
    const payload: PayloadToken = JSON.parse(decodedPayload)
    return payload
  }

  public async generateJWT(user: UserEntity): Promise<{ accessToken: string, user: UserEntity }> {
    const userConsult = await this.userService.findUserWithRole(user.id, user.role)
    // const payload: PayloadToken = {
    //   role: userConsult?.role,
    //   sub: userConsult?.id
    // }
    const payload: PayloadToken = this.payloadToken(userConsult)

    if (userConsult != null) {
      user.password = 'Not permission'
    }

    return {
      accessToken: this.sign(payload, this.getEnviroment('JWT_SECRET')),
      user
    }
  }

  public payloadToken(user: any): PayloadToken {
    const payload: PayloadToken = {
      role: user?.role,
      sub: user?.id
    }

    return payload

  }

}
