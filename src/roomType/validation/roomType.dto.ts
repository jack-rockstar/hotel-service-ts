import { BaseDto } from '../../config/base.dto'
import { IsNotEmpty } from 'class-validator'
export class RoomTypeDto extends BaseDto {
  @IsNotEmpty()
    roomTypeName!: string

  @IsNotEmpty()
    description!: string

  @IsNotEmpty()
    features!: string[]
}
