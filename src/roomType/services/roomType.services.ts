import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { RoomTypeEntity } from '../entities/roomType.entity'
import { RoomTypeDto } from '../validation/roomType.dto'

export class RoomTypeService extends BaseService<RoomTypeEntity> {
  constructor () {
    super(RoomTypeEntity)
  }

  async findAllRoomType (): Promise<RoomTypeEntity[]> {
    const repository = await this.execRepository
    return await repository.find()
  }

  async findRoomTypeById (id: string): Promise<RoomTypeEntity | null> {
    const repository = await this.execRepository
    return await repository.findOne({ where: { id } })
  }

  async createRoomType (body: RoomTypeDto): Promise<RoomTypeEntity> {
    const repository = await this.execRepository
    return await repository.save(body)
  }

  async deleteRoomType (id: string): Promise<DeleteResult> {
    const repository = await this.execRepository
    return await repository.delete({ id })
  }

  async updateRoomType (id: string, infoUpdate: RoomTypeEntity): Promise<UpdateResult> {
    const repository = await this.execRepository
    return await repository.update(id, infoUpdate)
  }
}
