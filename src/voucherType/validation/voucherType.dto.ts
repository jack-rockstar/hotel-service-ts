import { IsNotEmpty } from 'class-validator'
import { BaseDto } from '../../config/base.dto'
export class VoucherTypeDto extends BaseDto {
  @IsNotEmpty()
    name!: string
}
