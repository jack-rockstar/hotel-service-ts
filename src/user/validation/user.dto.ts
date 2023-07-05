import { BaseDto } from '../../config/base.dto'
import { IsLowercase, IsNotEmpty } from 'class-validator'

export class UserDto extends BaseDto {
  @IsNotEmpty()
    typeDoc!: string

  @IsNotEmpty()
    numberDoc!: string

  @IsNotEmpty()
  @IsLowercase()
    name!: string

  @IsNotEmpty()
  @IsLowercase()
    patLastname!: string

  @IsNotEmpty()
  @IsLowercase()
    matLastname!: string

  @IsNotEmpty()
    birthdate!: Date

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
