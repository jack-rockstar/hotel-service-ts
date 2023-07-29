import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { BillingEntity } from '../../billing/entities/billing.entity'
import { BaseEntity } from '../../config/base.entity'
import { GuestEntity } from '../../guest/entities/guest.entity'
import { RoomEntity } from '../../room/entities/room.entity'
import { UserEntity } from '../../user/entities/user.entity'
import { StatusRental } from '../validation/rental.dto'

@Entity({ name: 'RENTAL' })
export class RentalEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: StatusRental,
    default: StatusRental.PENDIENTE
  })
  status!: string

  @Column({ name: 'room_id', nullable: false })
  roomId!: string

  @Column({ name: 'guest_id', nullable: false })
  guestId!: string

  @Column({ name: 'user_id', nullable: false })
  userId!: string

  @ManyToOne(() => RoomEntity, (room) => room.rentals)
  @JoinColumn({ name: 'room_id' })
  room!: RoomEntity

  @ManyToOne(() => GuestEntity, (guest) => guest.rentals)
  @JoinColumn({ name: 'guest_id' })
  guest!: GuestEntity

  @ManyToOne(() => UserEntity, (user) => user.rentals)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity

  @Column({ type: 'timestamptz' })
  admissionDate!: Date

  @Column({ type: 'timestamptz' })
  departureDate!: Date

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  paymentInAdvance!: number

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  fullPayment!: number

  @OneToOne(() => BillingEntity, (billing) => billing.rental, { nullable: true })
  // @JoinColumn({ name: 'billing_id' })
  billing!: BillingEntity
}
