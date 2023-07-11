import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { GuestEntity } from '../entities/guest.entity'
import { GuestDto } from '../validation/guest.dto'

export class GuestService extends BaseService<GuestEntity> {
  constructor() {
    super(GuestEntity)
  }

  async findAllGuest(): Promise<GuestEntity[]> {
    const repository = await this.execRepository
    const data = await repository.find()
    return data
  }

  async findGuestById(id: string): Promise<GuestEntity | null> {
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

  async findHuespedByDoc(typeDoc: any, numberDoc: any): Promise<GuestEntity | null> {
    const repository = await this.execRepository
    try {
      const data = await repository.findOne({ where: { typeDoc, numberDoc } })
      if (data == null) throw new Error('No se encontro informacion con el ID especificado')

      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async createGuest(body: GuestDto): Promise<GuestEntity | any> {
    const repository = await this.execRepository
    try {
      const data = await repository.save(body)
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteGuest(id: string): Promise<DeleteResult> {
    const repository = await this.execRepository
    return await repository.delete({ id })
  }

  async updateGuest(id: string, infoUpdate: GuestEntity): Promise<UpdateResult> {
    const repository = await this.execRepository
    return await repository.update(id, infoUpdate)
  }
}
