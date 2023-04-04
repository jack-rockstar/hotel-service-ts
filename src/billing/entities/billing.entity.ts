import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { BaseEntity } from '../../config/base.entity'
import { RentalEntity } from '../../rental/entities/rental.entity'
import { VoucherTypeEntity } from '../../voucherType/entities/voucherType.entity'

@Entity({ name: 'BILLING' })
export class BillingEntity extends BaseEntity {
  @OneToOne(() => RentalEntity, (rental) => rental.id, { nullable: false })
  @JoinColumn({ name: 'rental_id' })
    rental!: RentalEntity

  @Column({ name: 'voucher_id', nullable: false })
    voucherId!: string

  @ManyToOne(() => VoucherTypeEntity, (voucher) => voucher.billings, { eager: true })
  @JoinColumn({ name: 'voucher_id' })
    voucher!: VoucherTypeEntity

  @Column()
    broadcastDate!: Date

  @Column()
    payDay!: Date

  @Column()
    fullPayment!: number
}
