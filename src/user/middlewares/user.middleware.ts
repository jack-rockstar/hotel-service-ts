import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { UserDto } from '../validation/user.dto'
import { AuthMiddleware } from '../../shared/middlewares/auth.middleware'

export class UserMiddleware extends AuthMiddleware {
  private readonly httpReponse: HttpResponse = new HttpResponse()

  userValidator (req: Request, res: Response, next: NextFunction): void {
    const {
      typeDoc,
      numberDoc,
      name,
      patLastname,
      matLastname,
      birthdate,
      direction,
      phone,
      email,
      user,
      password,
      role
    } = req.body

    const valid = new UserDto()
    valid.typeDoc = typeDoc ?? null
    valid.numberDoc = numberDoc
    valid.name = name
    valid.patLastname = patLastname
    valid.matLastname = matLastname
    valid.birthdate = birthdate
    valid.direction = direction
    valid.phone = phone
    valid.email = email
    valid.user = user
    valid.password = password
    valid.role = role

    validate(valid)
      .then(err => {
        if (err.length > 0) {
          return this.httpReponse.BadRequest(res, err)
        }
        return next()
      })
      .catch(e => console.log(e))
  }
}
