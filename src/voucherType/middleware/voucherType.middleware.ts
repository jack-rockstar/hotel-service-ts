import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { VoucherTypeDto } from '../validation/voucherType.dto'

export class VoucherTypeMiddleware {
  private readonly httpReponse: HttpResponse = new HttpResponse()

  voucherTypeValidator (req: Request, res: Response, next: NextFunction): void {
    const { name } = req.body

    const valid = new VoucherTypeDto()

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
