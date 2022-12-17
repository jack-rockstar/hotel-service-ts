import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../shared/response/http.response'
import { RoomService } from '../services/room.service'

export class RoomController {
  private readonly roomService: RoomService = new RoomService()
  private readonly httpReponse: HttpResponse = new HttpResponse()

  async getRooms (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET ROOM===')
      const data = await this.roomService.findAllRoom()
      if (data.length === 0) return this.httpReponse.NotFound(res, 'No existe informacion')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET ROOM===')
    }
  }

  async getRoomById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET ROOM BY ID===')
      const { id } = req.params
      const data = await this.roomService.findRoomById(id)
      if (data == null) {
        return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET  ROOM BY ID===')
    }
  }

  async createRoom (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE ROOM===')
      const data = await this.roomService.createRoom(req.body)
      if (data.driverError?.name === 'error') {
        return this.httpReponse.NotFound(res, data.driverError)
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      console.log(error)
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API CREATE ROOM===')
    }
  }

  async updateRoom (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE ROOM===')
      const { id } = req.params
      const data: UpdateResult | null = await this.roomService.updateRoom(id, req.body)

      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET UPDATE ROOM===')
    }
  }

  async deleteRoom (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE ROOM===')

      const { id } = req.params
      const data: DeleteResult | null = await this.roomService.deleteRoom(id)
      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET DELETE ROOM===')
    }
  }
}
