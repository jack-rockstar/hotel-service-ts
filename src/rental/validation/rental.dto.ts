import { IsNotEmpty } from 'class-validator'
import { BaseDto } from '../../config/base.dto'

export class RentalDto extends BaseDto {
  // @IsNotEmpty()
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

  // @IsNotEmpty()
  paymentInAdvance!: number

  @IsNotEmpty()
  fullPayment!: number
}

export enum StatusRental {
  CANCELADO = '0',
  PENDIENTE = '1'
}