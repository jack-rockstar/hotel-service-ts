import { IsOptional } from 'class-validator'
import { IsDate, IsUUID } from 'class-validator/types/decorator/decorators'

export class BaseDto {
  @IsUUID()
  @IsOptional()
  public id!: string

  @IsDate()
  @IsOptional()
  public createdAt!: Date

  @IsDate()
  @IsOptional()
  public updateAt!: Date
}
