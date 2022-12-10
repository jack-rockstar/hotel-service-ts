import { BaseDto } from '../../config/base.dto'
import { IsNotEmpty } from 'class-validator'

export class GuestDto extends BaseDto {
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

  nationality?: string

  direction?: string

  phone?: string

  email?: string
}
