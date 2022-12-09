import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @CreateDateColumn()
  public createdAd!: Date

  @UpdateDateColumn()
  public updateAd!: Date
}
