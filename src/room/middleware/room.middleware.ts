import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { RoomDto } from '../validation/room.dto'

export class RoomMiddleware {
  private readonly httpReponse: HttpResponse = new HttpResponse()

  roomValidator (req: Request, res: Response, next: NextFunction): void {
    const { numberRoom, flat, status, priceRoom, roomType } = req.body
    const valid = new RoomDto()

    valid.numberRoom = numberRoom
    valid.flat = flat
    valid.status = status
    valid.priceRoom = priceRoom
    valid.roomType = roomType

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
