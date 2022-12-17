import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { GuestDto } from '../validation/guest.dto'

export class GuestMiddleware {
  private readonly httpReponse: HttpResponse = new HttpResponse()

  guestValidator (req: Request, res: Response, next: NextFunction): void {
    const {
      typeDoc,
      numberDoc,
      name,
      lastname,
      age,
      direction,
      phone,
      email
    } = req.body

    const valid = new GuestDto()

    valid.typeDoc = typeDoc
    valid.numberDoc = numberDoc
    valid.name = name
    valid.lastname = lastname
    valid.age = age
    valid.direction = direction
    valid.phone = phone
    valid.email = email

    validate(valid)
      .then(err => {
        if (err.length > 0) {
          return this.httpReponse.Error(res, err)
        }
        return next()
      })
      .catch(e => console.log(e))
  }
}
