import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { RoomEntity } from '../entities/room.entity'
import { RoomDto } from '../validation/room.dto'

export class RoomService extends BaseService<RoomEntity> {
  constructor() {
    super(RoomEntity)
  }

  async findAllRoom(): Promise<RoomEntity[]> {
    const repository = await this.execRepository
    return await repository
      .createQueryBuilder('room')
      .innerJoinAndSelect('room.roomType', 'roomType')
      .leftJoinAndSelect('roomType.roomFeatures', 'roomFeatures')
      .getMany()
    // return await repository.find()
  }

  async findRoomById(id: string): Promise<RoomEntity | null> {
    const repository = await this.execRepository
    try {
      const data = await repository.findOne({ where: { id } })
      if (data == null) throw new Error('No se encontro informacion con el ID especificado')

      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async createRoom(body: RoomDto): Promise<RoomEntity | any> {
    const repository = await this.execRepository
    try {
      const data = await repository.save(body)
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteRoom(id: string): Promise<DeleteResult | null> {
    const repository = await this.execRepository
    try {
      const data: DeleteResult = await repository.delete({ id })
      console.log(data)
      if (Number(data?.affected) < 1) throw new Error('No se encontro informacion con el ID especificado')

      return data
    } catch (error) {
      return null
    }
  }

  async updateRoom(id: string, infoUpdate: RoomEntity): Promise<UpdateResult | null> {
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
