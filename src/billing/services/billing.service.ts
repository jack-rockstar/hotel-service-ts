import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { UserEntity } from '../../user/entities/user.entity'
import { BillingEntity } from '../entities/billing.entity'
import { BillingDto } from '../validation/billing.dto'

export class BillingService extends BaseService<BillingEntity> {
  constructor () {
    super(UserEntity)
  }

  async findAllBilling (): Promise<BillingEntity[]> {
    const repository = await this.execRepository
    return await repository.find()
  }

  async findBillingById (id: string): Promise<BillingEntity | null> {
    const repository = await this.execRepository
    return await repository.findOne({ where: { id } })
  }

  async createBilling (body: BillingDto): Promise<BillingEntity> {
    const repository = await this.execRepository
    return await repository.save(body)
  }

  async deleteBilling (id: string): Promise<DeleteResult> {
    const repository = await this.execRepository
    return await repository.delete({ id })
  }

  async updateBilling (id: string, infoUpdate: BillingEntity): Promise<UpdateResult> {
    const repository = await this.execRepository
    return await repository.update(id, infoUpdate)
  }
}
