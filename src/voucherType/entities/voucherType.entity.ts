import { Column, Entity, OneToMany } from 'typeorm'
import { BillingEntity } from '../../billing/entities/billing.entity'
import { BaseEntity } from '../../config/base.entity'

@Entity({ name: 'VOUCHER_TYPE' })
export class VoucherTypeEntity extends BaseEntity {
  @Column()
    name!: string

  @OneToMany(() => BillingEntity, (billing) => billing.voucher)
    billings!: BillingEntity[]
}
