import { Request, Response } from 'express'
import { BillingService } from '../services/billing.service'

export class BillingController {
  private readonly billingService: BillingService = new BillingService()

  async getBillings (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET BILLING===')
      const data = await this.billingService.findAllBilling()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET BILLING===')
    }
  }

  async getBillingById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET BILLING BY ID===')
      const { id } = req.params
      const data = await this.billingService.findBillingById(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET  BILLING BY ID===')
    }
  }

  async createBilling (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE BILLING===')

      const data = await this.billingService.createBilling(req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API CREATE BILLING===')
    }
  }

  async updateBilling (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE BILLING===')
      const { id } = req.params
      const data = await this.billingService.updateBilling(id, req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET UPDATE BILLING===')
    }
  }

  async deleteBilling (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE BILLING===')

      const { id } = req.params
      const data = await this.billingService.deleteBilling(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET DELETE BILLING===')
    }
  }
}
