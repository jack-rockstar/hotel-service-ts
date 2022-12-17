import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../shared/response/http.response'
import { RoomTypeService } from '../services/roomType.services'

export class RoomTypeController {
  private readonly roomTypeService: RoomTypeService = new RoomTypeService()
  private readonly httpReponse: HttpResponse = new HttpResponse()

  async getRoomTypes (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET RoomType===')
      const data = await this.roomTypeService.findAllRoomType()
      if (data.length === 0) return this.httpReponse.NotFound(res, 'No existe informacion')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET RoomType===')
    }
  }

  async getRoomTypeById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET RoomType BY ID===')
      const { id } = req.params
      const data = await this.roomTypeService.findRoomTypeById(id)
      if (data == null) {
        return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET  RoomType BY ID===')
    }
  }

  async createRoomType (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE RoomType===')

      const data = await this.roomTypeService.createRoomType(req.body)
      if (data.driverError?.name === 'error') {
        return this.httpReponse.NotFound(res, data.driverError)
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API CREATE RoomType===')
    }
  }

  async updateRoomType (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE RoomType===')
      const { id } = req.params
      const data: UpdateResult | null = await this.roomTypeService.updateRoomType(id, req.body)

      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET UPDATE RoomType===')
    }
  }

  async deleteRoomType (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE RoomType===')

      const { id } = req.params
      const data: DeleteResult | null = await this.roomTypeService.deleteRoomType(id)
      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET DELETE RoomType===')
    }
  }
}
