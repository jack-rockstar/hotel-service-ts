import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { VoucherEntity } from '../entities/voucher.entity'
import { VoucherDto } from '../validation/voucher.dto'

export class VoucherService extends BaseService<VoucherEntity> {
  constructor () {
    super(VoucherEntity)
  }

  async findAllVoucher (): Promise<VoucherEntity[]> {
    const repository = await this.execRepository
    return await repository.find()
  }

  async findVoucherById (id: string): Promise<VoucherEntity | null> {
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

  async createVoucher (body: VoucherDto): Promise<VoucherEntity | any> {
    const repository = await this.execRepository
    try {
      const data = await repository.save(body)
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteVoucher (id: string): Promise<DeleteResult | null> {
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

  async updateVoucher (id: string, infoUpdate: VoucherEntity): Promise<UpdateResult | null> {
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
