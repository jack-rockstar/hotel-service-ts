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
    return await repository.findOne({ where: { id } })
  }

  async createVoucher (body: VoucherDto): Promise<VoucherEntity> {
    const repository = await this.execRepository
    return await repository.save(body)
  }

  async deleteVoucher (id: string): Promise<DeleteResult> {
    const repository = await this.execRepository
    return await repository.delete({ id })
  }

  async updateVoucher (id: string, infoUpdate: VoucherEntity): Promise<UpdateResult> {
    const repository = await this.execRepository
    return await repository.update(id, infoUpdate)
  }
}
