import { IsOptional, IsDate, IsUUID } from 'class-validator'

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
