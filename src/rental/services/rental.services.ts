import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { RentalEntity } from '../entities/rental.entity'
import { RentalDto } from '../validation/rental.dto'

export class RentalService extends BaseService<RentalEntity> {
  constructor () {
    super(RentalEntity)
  }

  async findAllRentals (): Promise<RentalEntity[]> {
    const repository = await this.execRepository
    return await repository.find()
  }

  async findRentalById (id: string): Promise<RentalEntity | null> {
    const repository = await this.execRepository
    return await repository.findOne({ where: { id } })
  }

  async createRental (body: RentalDto): Promise<RentalEntity | any> {
    const repository = await this.execRepository
    try {
      const data = await repository.save(body)
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteRental (id: string): Promise<DeleteResult> {
    const repository = await this.execRepository
    return await repository.delete({ id })
  }

  async updateRental (id: string, infoUpdate: RentalEntity): Promise<UpdateResult> {
    const repository = await this.execRepository
    return await repository.update(id, infoUpdate)
  }
}
