import { IsNotEmpty } from 'class-validator'
import { BaseDto } from '../../config/base.dto'
export class VoucherDto extends BaseDto {
  @IsNotEmpty()
    name!: string
}
