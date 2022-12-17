import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { BillingEntity } from '../entities/billing.entity'
import { BillingDto } from '../validation/billing.dto'

export class BillingService extends BaseService<BillingEntity> {
  constructor () {
    super(BillingEntity)
  }

  async findAllBilling (): Promise<BillingEntity[]> {
    const repository = await this.execRepository
    return await repository.find()
  }

  async findBillingById (id: string): Promise<BillingEntity | null> {
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

  async createBilling (body: BillingDto): Promise<BillingEntity | any> {
    const repository = await this.execRepository
    try {
      const data = await repository.save(body)
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteBilling (id: string): Promise<DeleteResult | null> {
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

  async updateBilling (id: string, infoUpdate: BillingEntity): Promise<UpdateResult | null> {
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
