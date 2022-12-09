import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from '../../config/base.entity'
import { RentalEntity } from '../../rental/entities/rental.entity'
import { RoomTypeEntity } from '../../roomType/entities/roomType.entity'

@Entity({ name: 'ROOM' })
export class RoomEntity extends BaseEntity {
  @Column()
    numberRoom!: string

  @Column()
    flat!: string

  @Column()
    status!: string

  @Column()
    priceRoom!: number

  @ManyToOne(() => RoomTypeEntity, (roomType) => roomType.bedRooms)
  @JoinColumn({ name: 'room_type_id' })
    roomType!: RoomTypeEntity

  @OneToMany(() => RentalEntity, (rental) => rental.room)
    rentals!: RentalEntity[]
}
