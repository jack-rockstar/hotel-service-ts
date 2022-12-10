import { Request, Response } from 'express'
import { VoucherService } from '../services/voucher.service'

export class VoucherController {
  private readonly VoucherService: VoucherService = new VoucherService()

  async getVouchers (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET Voucher===')
      const data = await this.VoucherService.findAllVoucher()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET Voucher===')
    }
  }

  async getVoucherById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET Voucher BY ID===')
      const { id } = req.params
      const data = await this.VoucherService.findVoucherById(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET  Voucher BY ID===')
    }
  }

  async createVoucher (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE Voucher===')

      const data = await this.VoucherService.createVoucher(req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API CREATE Voucher===')
    }
  }

  async updateVoucher (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE Voucher===')
      const { id } = req.params
      const data = await this.VoucherService.updateVoucher(id, req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET UPDATE Voucher===')
    }
  }

  async deleteVoucher (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE Voucher===')

      const { id } = req.params
      const data = await this.VoucherService.deleteVoucher(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET DELETE Voucher===')
    }
  }
}
