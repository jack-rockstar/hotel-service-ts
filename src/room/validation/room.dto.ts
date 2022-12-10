import { IsNotEmpty } from 'class-validator'
import { BaseDto } from '../../config/base.dto'
export class RoomDto extends BaseDto {
  @IsNotEmpty()
    numberRoom!: string

  @IsNotEmpty()
    flat!: string

  @IsNotEmpty()
    status!: string

  @IsNotEmpty()
    priceRoom!: number
}
