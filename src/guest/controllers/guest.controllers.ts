import { Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { GuestService } from '../services/guest.service'

export class GuestController {
  private readonly guestService: GuestService = new GuestService()
  private readonly httpReponse: HttpResponse = new HttpResponse()

  async getGuest (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET GUEST===')
      const data = await this.guestService.findAllGuest()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET GUEST===')
    }
  }

  async getGuestById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET GUEST BY ID===')
      const { id } = req.params
      const data = await this.guestService.findGuestById(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET  GUEST BY ID===')
    }
  }

  async createGuest (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE GUEST===')
      const data = await this.guestService.createGuest(req.body)
      if (data.driverError?.name === 'error') {
        return this.httpReponse.NotFound(res, data.driverError)
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      console.log(error)
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API CREATE GUEST===')
    }
  }

  async updateGuest (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE GUEST===')
      const { id } = req.params
      const data = await this.guestService.updateGuest(id, req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET UPDATE GUEST===')
    }
  }

  async deleteGuest (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE GUEST===')

      const { id } = req.params
      const data = await this.guestService.deleteGuest(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET DELETE GUEST===')
    }
  }
}
