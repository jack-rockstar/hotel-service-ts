import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { HttpResponse } from '../../shared/response/http.response'
import { UserEntity } from '../../user/entities/user.entity'

export class AuthController extends AuthService {
  constructor (
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {
    super()
  }

  async login (req: Request, res: Response): Promise<any> {
    try {
      console.log('==== LOGIN ====')
      const userEncode = req.user as UserEntity
      const encode = await this.generateJWT(userEncode)
      if (encode === undefined || encode === null) {
        return this.httpResponse.Unauthorized(res, 'No tienes permisos asignados')
      }
      res.header('Content-Type', 'application/json')
      res.cookie('accessToken', encode.accessToken, { maxAge: 60000 * 60 })
      res.write(JSON.stringify(encode))
      res.end()
    } catch (error) {
      console.error(error)
      return this.httpResponse.Error(res, error)
    }
  }
}