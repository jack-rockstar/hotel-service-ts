import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { VoucherTypeEntity } from '../entities/voucherType.entity'
import { VoucherTypeDto } from '../validation/voucherType.dto'

export class VoucherTypeService extends BaseService<VoucherTypeEntity> {
  constructor () {
    super(VoucherTypeEntity)
  }

  async findAllVoucher (): Promise<VoucherTypeEntity[]> {
    const repository = await this.execRepository
    return await repository.find()
  }

  async findVoucherById (id: string): Promise<VoucherTypeEntity | null> {
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

  async createVoucher (body: VoucherTypeDto): Promise<VoucherTypeEntity | any> {
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

  async updateVoucher (id: string, infoUpdate: VoucherTypeEntity): Promise<UpdateResult | null> {
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
