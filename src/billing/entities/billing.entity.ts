import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { BaseEntity } from '../../config/base.entity'
import { RentalEntity } from '../../rental/entities/rental.entity'
import { VoucherEntity } from '../../voucher/entities/voucher.entity'

@Entity({ name: 'BILLING' })
export class BillingEntity extends BaseEntity {
  @OneToOne(() => RentalEntity, (rental) => rental.id, { nullable: false })
  @JoinColumn({ name: 'rental_id' })
    rental!: RentalEntity

  @Column({ name: 'voucher_id', nullable: false })
    voucherId!: string

  @ManyToOne(() => VoucherEntity, (voucher) => voucher.billings, { eager: true })
  @JoinColumn({ name: 'voucher_id' })
    voucher!: VoucherEntity

  @Column()
    broadcastDate!: Date

  @Column()
    payDay!: Date

  @Column()
    fullPayment!: number
}
