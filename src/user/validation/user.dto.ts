import { BaseDto } from '../../config/base.dto'
import { IsNotEmpty } from 'class-validator'

export class UserDto extends BaseDto {
  @IsNotEmpty()
    typeDoc!: string

  @IsNotEmpty()
    numberDoc!: string

  @IsNotEmpty()
    name!: string

  @IsNotEmpty()
    lastname!: string

  @IsNotEmpty()
    age!: string

  direction?: string

  @IsNotEmpty()
    phone!: string

  email?: string

  @IsNotEmpty()
    user!: string

  @IsNotEmpty()
    password!: string

  @IsNotEmpty()
    role!: RoleType
}

export enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
  QUOTEER = 'QUOTEER'
}
