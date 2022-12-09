import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../config/base.entity'
import { RentalEntity } from '../../rental/entities/rental.entity'

@Entity({ name: 'USER' })
export class UserEntity extends BaseEntity {
  @Column()
    typeDoc!: string

  @Column({ unique: true })
    numberDoc!: string

  @Column()
    name!: string

  @Column()
    lastname!: string

  @Column()
    age!: string

  @Column({ nullable: true })
    direction?: string

  @Column({ nullable: true })
    phone?: string

  @Column({ nullable: true })
    email?: string

  @Column({ unique: true })
    user!: string

  @Column({ unique: true })
    password!: string

  @OneToMany(() => RentalEntity, (rental) => rental.user)
    rentals!: RentalEntity[]
}
