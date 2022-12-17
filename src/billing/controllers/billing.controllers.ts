import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../shared/response/http.response'
import { BillingService } from '../services/billing.service'

export class BillingController {
  private readonly billingService: BillingService = new BillingService()
  private readonly httpReponse: HttpResponse = new HttpResponse()

  async getBillings (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET BILLING===')
      const data = await this.billingService.findAllBilling()
      if (data.length === 0) return this.httpReponse.NotFound(res, 'No existe informacion')
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET BILLING===')
    }
  }

  async getBillingById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET BILLING BY ID===')
      const { id } = req.params
      const data = await this.billingService.findBillingById(id)
      if (data == null) {
        return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET  BILLING BY ID===')
    }
  }

  async createBilling (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE BILLING===')

      const data = await this.billingService.createBilling(req.body)
      if (data.driverError?.name === 'error') {
        return this.httpReponse.NotFound(res, data.driverError)
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API CREATE BILLING===')
    }
  }

  async updateBilling (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE BILLING===')
      const { id } = req.params
      const data: UpdateResult | null = await this.billingService.updateBilling(id, req.body)
      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET UPDATE BILLING===')
    }
  }

  async deleteBilling (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE BILLING===')

      const { id } = req.params
      const data: DeleteResult | null = await this.billingService.deleteBilling(id)
      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET DELETE BILLING===')
    }
  }
}
