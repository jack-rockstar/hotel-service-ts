import { Request, Response } from 'express'
import { RoomTypeService } from '../services/roomType.services'

export class RoomTypeController {
  private readonly RoomTypeService: RoomTypeService = new RoomTypeService()

  async getRoomTypes (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET RoomType===')
      const data = await this.RoomTypeService.findAllRoomType()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET RoomType===')
    }
  }

  async getRoomTypeById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET RoomType BY ID===')
      const { id } = req.params
      const data = await this.RoomTypeService.findRoomTypeById(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET  RoomType BY ID===')
    }
  }

  async createRoomType (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE RoomType===')

      const data = await this.RoomTypeService.createRoomType(req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API CREATE RoomType===')
    }
  }

  async updateRoomType (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE RoomType===')
      const { id } = req.params
      const data = await this.RoomTypeService.updateRoomType(id, req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET UPDATE RoomType===')
    }
  }

  async deleteRoomType (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE RoomType===')

      const { id } = req.params
      const data = await this.RoomTypeService.deleteRoomType(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET DELETE RoomType===')
    }
  }
}
