import { BaseDto } from '../../config/base.dto'
import { IsNotEmpty } from 'class-validator'
export class BillingDto extends BaseDto {
  @IsNotEmpty()
    broadcastDate!: Date

  @IsNotEmpty()
    payDay!: Date

  @IsNotEmpty()
    fullPayment!: number
}
