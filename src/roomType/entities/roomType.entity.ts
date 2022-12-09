import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../config/base.entity'
import { RoomEntity } from '../../room/entities/room.entity'

@Entity({ name: 'ROOM_TYPE' })
export class RoomTypeEntity extends BaseEntity {
  @Column()
    roomTypeName!: string

  @Column()
    description!: string

  @Column()
    features!: string

  @OneToMany(() => RoomEntity, (RoomEntity) => RoomEntity.roomType)
    bedRooms!: RoomEntity[]
}
