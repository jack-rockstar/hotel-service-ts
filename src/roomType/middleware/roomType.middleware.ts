import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { RoomTypeDto } from '../validation/roomType.dto'

export class RoomTypeMiddleware {
  private readonly httpReponse: HttpResponse = new HttpResponse()

  roomTypeValidator (req: Request, res: Response, next: NextFunction): void {
    const { roomTypeName, description, features } = req.body

    const valid = new RoomTypeDto()

    valid.roomTypeName = roomTypeName
    valid.description = description
    valid.features = features

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
