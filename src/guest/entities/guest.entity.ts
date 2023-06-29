import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../config/base.entity'
import { RentalEntity } from '../../rental/entities/rental.entity'

@Entity({ name: 'GUEST' })
export class GuestEntity extends BaseEntity {
  @Column()
    typeDoc!: string

  @Column({ unique: true })
    numberDoc!: string

  @Column()
    name!: string

  @Column()
    lastname!: string

  @Column()
    birthDate!: Date

  @Column({ nullable: true })
    nationality?: string

  @Column({ nullable: true })
    direction?: string

  @Column({ nullable: true })
    phone?: string

  @Column({ nullable: true })
    email?: string

  @OneToMany(() => RentalEntity, (rental) => rental.guest, { eager: true })
    rentals!: RentalEntity[]
}
