import { BaseDto } from '../../config/base.dto'
import { IsNotEmpty } from 'class-validator'

export class RentalDto extends BaseDto {
  @IsNotEmpty()
    status!: string

  @IsNotEmpty()
    roomId!: string

  @IsNotEmpty()
    guestId!: string

  @IsNotEmpty()
    userId!: string

  @IsNotEmpty()
    admissionDate!: Date

  @IsNotEmpty()
    departureDate!: Date
}
