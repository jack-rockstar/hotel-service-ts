import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { GuestEntity } from '../entities/guest.entity'
import { GuestDto } from '../validation/guest.dto'

export class GuestService extends BaseService<GuestEntity> {
  constructor () {
    super(GuestEntity)
  }

  async findAllGuest (): Promise<GuestEntity[]> {
    const repository = await this.execRepository
    return await repository.find()
  }

  async findGuestById (id: string): Promise<GuestEntity | null> {
    const repository = await this.execRepository
    return await repository.findOne({ where: { id } })
  }

  async createGuest (body: GuestDto): Promise<GuestEntity> {
    const repository = await this.execRepository
    return await repository.save(body)
  }

  async deleteGuest (id: string): Promise<DeleteResult> {
    const repository = await this.execRepository
    return await repository.delete({ id })
  }

  async updateGuest (id: string, infoUpdate: GuestEntity): Promise<UpdateResult> {
    const repository = await this.execRepository
    return await repository.update(id, infoUpdate)
  }
}
