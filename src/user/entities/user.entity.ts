// import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../config/base.entity'
import { RentalEntity } from '../../rental/entities/rental.entity'
import { RoleType } from '../validation/user.dto'
import { IsDateString } from 'class-validator'

@Entity({ name: 'USER' })
export class UserEntity extends BaseEntity {
  @Column()
    typeDoc!: string

  @Column({ unique: true })
    numberDoc!: string

  @Column()
    name!: string

  @Column()
    patLastname!: string

  @Column()
    matLastname!: string

  @Column()
  @IsDateString({ strict: true })
    birthdate!: Date

  @Column({ nullable: true })
    direction?: string

  @Column({ nullable: true })
    phone?: string

  @Column({ nullable: true })
    email?: string

  @Column({ unique: true })
    user!: string

  // @Exclude()
  @Column({ unique: true, select: false })
    password!: string

  @Column({ type: 'enum', enum: RoleType, nullable: false })
    role!: RoleType

  @OneToMany(() => RentalEntity, (rental) => rental.user, { eager: true })
    rentals!: RentalEntity[]
}
