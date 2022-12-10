import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { RoomEntity } from '../entities/room.entity'
import { RoomDto } from '../validation/room.dto'

export class RoomService extends BaseService<RoomEntity> {
  constructor () {
    super(RoomEntity)
  }

  async findAllRoom (): Promise<RoomEntity[]> {
    const repository = await this.execRepository
    return await repository.find()
  }

  async findRoomById (id: string): Promise<RoomEntity | null> {
    const repository = await this.execRepository
    return await repository.findOne({ where: { id } })
  }

  async createRoom (body: RoomDto): Promise<RoomEntity> {
    const repository = await this.execRepository
    return await repository.save(body)
  }

  async deleteRoom (id: string): Promise<DeleteResult> {
    const repository = await this.execRepository
    return await repository.delete({ id })
  }

  async updateRoom (id: string, infoUpdate: RoomEntity): Promise<UpdateResult> {
    const repository = await this.execRepository
    return await repository.update(id, infoUpdate)
  }
}
