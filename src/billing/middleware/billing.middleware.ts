import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { BillingDto } from '../validation/billing.dto'

export class BillingMiddleware {
  private readonly httpReponse: HttpResponse = new HttpResponse()

  billingValidator (req: Request, res: Response, next: NextFunction): void {
    const {
      rental,
      voucherId,
      broadcastDate,
      payday,
      fullPayment

    } = req.body

    const valid = new BillingDto()

    valid.rental = rental
    valid.voucherId = voucherId
    valid.broadcastDate = broadcastDate
    valid.payDay = payday
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
