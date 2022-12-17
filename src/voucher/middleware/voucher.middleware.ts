import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { VoucherDto } from '../validation/voucher.dto'

export class VoucherMiddleware {
  private readonly httpReponse: HttpResponse = new HttpResponse()

  voucherValidator (req: Request, res: Response, next: NextFunction): void {
    const { name } = req.body

    const valid = new VoucherDto()

    valid.name = name
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
