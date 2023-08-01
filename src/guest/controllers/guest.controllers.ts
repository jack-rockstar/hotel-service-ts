import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../shared/response/http.response'
import { GuestService } from '../services/guest.service'

export class GuestController {
  private readonly guestService: GuestService = new GuestService()
  private readonly httpReponse: HttpResponse = new HttpResponse()

  async getGuest(_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET GUEST===')
      const data = await this.guestService.findAllGuest()
      if (data.length === 0) return this.httpReponse.NotFound(res, 'No existe informacion')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      console.log(error)
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET GUEST===')
    }
  }

  async getGuestById(req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET GUEST BY ID===')
      const { id } = req.query
      if (!id) return this.httpReponse.NotFound(res, 'No se envio el id del cliente')
      const data = await this.guestService.findGuestById(id as string)
      if (data == null) {
        return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET  GUEST BY ID===')
    }
  }

  async getHuespedByDoc(req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET GUEST BY DOCUMENT===')
      const { typeDoc, numberDoc } = req.query
      const data = await this.guestService.findHuespedByDoc(typeDoc, numberDoc)
      if (data == null) {
        return this.httpReponse.NotFound(res, 'No se encontro informacion con el tipo documento especificado')
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET  GUEST BY DOCUMENT===')
    }
  }

  async createGuest(req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE GUEST===')
      const guest = req.body
      const { guestId } = guest
      if (!guestId) {
        const data = await this.guestService.createGuest(req.body)
        if (data.driverError?.name === 'error') {
          return this.httpReponse.NotFound(res, data.driverError)
        }
        return this.httpReponse.Ok(res, data)
      } else {
        const data: UpdateResult | null = await this.guestService.updateGuest(guestId, req.body)
        if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
        return this.httpReponse.Ok(res, data)
      }

    } catch (error) {
      console.log(error)
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API CREATE GUEST===')
    }
  }

  async updateGuest(req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE GUEST===')
      const { id } = req.params
      const data: UpdateResult | null = await this.guestService.updateGuest(id, req.body)

      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET UPDATE GUEST===')
    }
  }

  async deleteGuest(req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE GUEST===')

      const { id } = req.params
      const data: DeleteResult | null = await this.guestService.deleteGuest(id)
      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET DELETE GUEST===')
    }
  }
}
