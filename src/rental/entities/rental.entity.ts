import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../config/base.entity'
import { GuestEntity } from '../../guest/entities/guest.entity'
import { RoomEntity } from '../../room/entities/room.entity'
import { UserEntity } from '../../user/entities/user.entity'

@Entity({ name: 'RENTAL' })
export class RentalEntity extends BaseEntity {
  @Column()
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

  @Column()
    admissionDate!: Date

  @Column()
    departureDate!: Date
}
