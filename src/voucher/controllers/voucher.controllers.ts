import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../shared/response/http.response'
import { VoucherService } from '../services/voucher.service'

export class VoucherController {
  private readonly voucherService: VoucherService = new VoucherService()
  private readonly httpReponse: HttpResponse = new HttpResponse()

  async getVouchers (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET Voucher===')
      const data = await this.voucherService.findAllVoucher()
      if (data.length === 0) return this.httpReponse.NotFound(res, 'No existe informacion')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET Voucher===')
    }
  }

  async getVoucherById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET Voucher BY ID===')
      const { id } = req.params
      const data = await this.voucherService.findVoucherById(id)
      if (data == null) {
        return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET  Voucher BY ID===')
    }
  }

  async createVoucher (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE Voucher===')

      const data = await this.voucherService.createVoucher(req.body)
      if (data.driverError?.name === 'error') {
        return this.httpReponse.NotFound(res, data)
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API CREATE Voucher===')
    }
  }

  async updateVoucher (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE Voucher===')
      const { id } = req.params
      const data: UpdateResult | null = await this.voucherService.updateVoucher(id, req.body)

      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET UPDATE Voucher===')
    }
  }

  async deleteVoucher (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE Voucher===')

      const { id } = req.params
      const data: DeleteResult | null = await this.voucherService.deleteVoucher(id)
      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET DELETE Voucher===')
    }
  }
}
