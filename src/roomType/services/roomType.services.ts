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
    try {
      const data = await repository.findOne({ where: { id } })
      if (data == null) throw new Error('No se encontro informacion')

      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async createRoomType (body: RoomTypeDto): Promise<RoomTypeEntity | any> {
    const repository = await this.execRepository
    try {
      const data = await repository.save(body)
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteRoomType (id: string): Promise<DeleteResult | null> {
    const repository = await this.execRepository
    try {
      const data: DeleteResult = await repository.delete({ id })
      if (Number(data?.affected) < 1) throw new Error('No se encontro informacion con el ID especificado')
      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async updateRoomType (id: string, infoUpdate: RoomTypeEntity): Promise<UpdateResult | null> {
    const repository = await this.execRepository
    try {
      const data = await repository.update(id, infoUpdate)
      if (data == null) throw new Error('No se encontro informacion con el ID especificado')
      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
