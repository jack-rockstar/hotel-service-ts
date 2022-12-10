import { BaseDto } from '../../config/base.dto'
import { IsNotEmpty } from 'class-validator'

export class RentalDto extends BaseDto {
  @IsNotEmpty()
    status!: string

  @IsNotEmpty()
    admissionDate!: Date

  @IsNotEmpty()
    departureDate!: Date
}
