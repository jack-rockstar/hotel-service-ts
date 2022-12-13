import { Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { RentalService } from '../services/rental.services'

export class RentalController {
  private readonly rentalService: RentalService = new RentalService()
  private readonly httpReponse: HttpResponse = new HttpResponse()

  async getRentals (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET RENTAL===')
      const data = await this.rentalService.findAllRentals()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET RENTAL===')
    }
  }

  async getRentalById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET RENTAL BY ID===')
      const { id } = req.params
      const data = await this.rentalService.findRentalById(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET  RENTAL BY ID===')
    }
  }

  async createRental (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE RENTAL===')
      const data = await this.rentalService.createRental(req.body)
      if (data.driverError?.name === 'error') {
        return this.httpReponse.NotFound(res, data)
      }
      return this.httpReponse.Ok(res, data)
    } catch (error: object | any) {
      console.log(error)
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API CREATE RENTAL===')
    }
  }

  async updateRental (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE RENTAL===')
      const { id } = req.params
      const data = await this.rentalService.updateRental(id, req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET UPDATE RENTAL===')
    }
  }

  async deleteRental (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE RENTAL===')

      const { id } = req.params
      const data = await this.rentalService.deleteRental(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET DELETE RENTAL===')
    }
  }
}
