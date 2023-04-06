import passport from 'passport'
import { HttpResponse } from '../response/http.response'
import { NextFunction, Request, Response } from 'express'
import { UserEntity } from '../../user/entities/user.entity'
import { RoleType } from '../../user/validation/user.dto'

export class AuthMiddleware {
  constructor (public httpResponse: HttpResponse = new HttpResponse()) {
  }

  passAuth (type: string): any {
    return passport.authenticate(type, { session: false })
  }

  checkAdminRole (req: Request, res: Response, next: NextFunction): any {
    const user = req.user as UserEntity
    if (user.role !== RoleType.ADMIN) return this.httpResponse.Unauthorized(res, 'No tienes permisos')

    return next()
  }
}
