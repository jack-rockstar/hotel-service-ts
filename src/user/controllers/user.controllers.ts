import { Request, Response } from 'express'

export class UserController {
  getUser (_req: Request, res: Response): any {
    return res.status(200).json({
      user: 'Jack Najarro'
    })
  }
}
