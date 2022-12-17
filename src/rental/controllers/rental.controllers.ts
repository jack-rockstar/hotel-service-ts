import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../shared/response/http.response'
import { RentalService } from '../services/rental.services'

export class RentalController {
  private readonly rentalService: RentalService = new RentalService()
  private readonly httpReponse: HttpResponse = new HttpResponse()

  async getRentals (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET RENTAL===')
      const data = await this.rentalService.findAllRentals()
      if (data.length === 0) return this.httpReponse.NotFound(res, 'No existe informacion')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      console.log(error)
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET RENTAL===')
    }
  }

  async getRentalById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET RENTAL BY ID===')
      const { id } = req.params
      const data = await this.rentalService.findRentalById(id)
      if (data == null) {
        return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
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
      const data: UpdateResult | null = await this.rentalService.updateRental(id, req.body)

      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET UPDATE RENTAL===')
    }
  }

  async deleteRental (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE RENTAL===')

      const { id } = req.params
      const data: DeleteResult | null = await this.rentalService.deleteRental(id)
      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET DELETE RENTAL===')
    }
  }
}
