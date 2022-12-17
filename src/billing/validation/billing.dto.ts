import { BaseDto } from '../../config/base.dto'
import { IsNotEmpty } from 'class-validator'
export class BillingDto extends BaseDto {
  @IsNotEmpty()
    rental!: string

  @IsNotEmpty()
    voucherId!: string

  @IsNotEmpty()
    broadcastDate!: Date

  @IsNotEmpty()
    payDay!: Date

  @IsNotEmpty()
    fullPayment!: number
}
