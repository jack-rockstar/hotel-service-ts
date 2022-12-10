import { Request, Response } from 'express'
import { RoomService } from '../services/room.service'

export class RoomController {
  private readonly roomService: RoomService = new RoomService()

  async getRooms (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET ROOM===')
      const data = await this.roomService.findAllRoom()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET ROOM===')
    }
  }

  async getRoomById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET ROOM BY ID===')
      const { id } = req.params
      const data = await this.roomService.findRoomById(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET  ROOM BY ID===')
    }
  }

  async createRoom (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE ROOM===')

      const data = await this.roomService.createRoom(req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API CREATE ROOM===')
    }
  }

  async updateRoom (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE ROOM===')
      const { id } = req.params
      const data = await this.roomService.updateRoom(id, req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET UPDATE ROOM===')
    }
  }

  async deleteRoom (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE ROOM===')

      const { id } = req.params
      const data = await this.roomService.deleteRoom(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET DELETE ROOM===')
    }
  }
}
