import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { RoomTypeEntity } from "../../roomType/entities/roomType.entity";
import { BaseEntity } from "../../config/base.entity";


@Entity({ name: 'ROOM_FEATURES' })
export class RoomFeaturesEntity extends BaseEntity {
  @Column()
  featureName !: string

  @Column()
  featuresValue!: string

  @ManyToOne(() => RoomTypeEntity, (roomType) => roomType.roomFeatures)
  @JoinColumn({ name: 'room_features_id' })
  features!: RoomTypeEntity
}