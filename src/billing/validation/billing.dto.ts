import { BaseDto } from '../../config/base.dto'
import { IsNotEmpty } from 'class-validator'
import { RentalEntity } from '../../rental/entities/rental.entity'
export class BillingDto extends BaseDto {
  @IsNotEmpty()
    rental!: RentalEntity

  @IsNotEmpty()
    voucherId!: string

  @IsNotEmpty()
    broadcastDate!: Date

  @IsNotEmpty()
    payDay!: Date

  @IsNotEmpty()
    fullPayment!: number
}
