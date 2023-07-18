import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { RentalDto } from '../validation/rental.dto'

export class RentalMiddleware {
  private readonly httpReponse: HttpResponse = new HttpResponse()

  rentalValidator(req: Request, res: Response, next: NextFunction): void {
    const { status, roomId, guestId, userId, admissionDate, departureDate, paymentInAdvance, fullPayment } = req.body
    const valid = new RentalDto()

    valid.status = status
    valid.roomId = roomId
    valid.guestId = guestId
    valid.userId = userId
    valid.admissionDate = admissionDate
    valid.departureDate = departureDate
    valid.paymentInAdvance = paymentInAdvance
    valid.fullPayment = fullPayment

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
