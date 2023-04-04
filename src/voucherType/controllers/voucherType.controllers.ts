import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../shared/response/http.response'
import { VoucherTypeService } from '../services/voucherType.service'

export class VoucherTypeController {
  private readonly VoucherTypeService: VoucherTypeService = new VoucherTypeService()
  private readonly httpReponse: HttpResponse = new HttpResponse()

  async getVouchers (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET Voucher===')
      const data = await this.VoucherTypeService.findAllVoucher()
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
      const data = await this.VoucherTypeService.findVoucherById(id)
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

      const data = await this.VoucherTypeService.createVoucher(req.body)
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
      const data: UpdateResult | null = await this.VoucherTypeService.updateVoucher(id, req.body)

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
      const data: DeleteResult | null = await this.VoucherTypeService.deleteVoucher(id)
      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET DELETE Voucher===')
    }
  }
}
