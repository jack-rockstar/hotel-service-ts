import { Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { UserEntity } from '../../user/entities/user.entity'
import { AuthService } from '../services/auth.service'

export class AuthController extends AuthService {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {
    super()
  }

  async login(req: Request, res: Response): Promise<any> {
    try {
      console.log('==== LOGIN ====')
      console.log(req.hostname)
      const userEncode = req.user as UserEntity
      const encode = await this.generateJWT(userEncode)
      if (encode === undefined || encode === null) {
        return this.httpResponse.Unauthorized(res, 'No tienes permisos asignados')
      }
      res.header('Content-Type', 'application/json')
      res.cookie('accessToken', encode.accessToken, {
        maxAge: 60000 * 60
      })
      res.write(JSON.stringify(encode))
      res.end()
    } catch (error) {
      console.error(error)
      return this.httpResponse.Error(res, error)
    }
  }

  async refresh(req: Request, res: Response): Promise<any> {
    try {
      const { accessToken } = req.cookies
      if (!accessToken) {
        return this.httpResponse.NotFound(res, 'No se esta enviendo el token original')
      }
      const user = this.refreshToken(accessToken)
      if (!user) return this.httpResponse.Forbidden(res, 'No es un token valido')

      return this.httpResponse.Ok(res, user)
    } catch (error) {
      console.log(error)
      return this.httpResponse.Error(res, error)
    }
  }
}
