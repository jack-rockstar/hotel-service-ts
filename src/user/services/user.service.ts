import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { UserEntity } from '../entities/user.entity'
import { UserDto } from '../validation/user.dto'

export class UserService extends BaseService<UserEntity> {
  constructor () {
    super(UserEntity)
  }

  async findAllUser (): Promise<UserEntity[]> {
    const repository = await this.execRepository
    return await repository.find()
  }

  async findUserById (id: string): Promise<UserEntity | null> {
    const repository = await this.execRepository
    return await repository.findOne({ where: { id } })
  }

  async createUser (body: UserDto): Promise<UserEntity> {
    const repository = await this.execRepository
    return await repository.save(body)
  }

  async deleteUser (id: string): Promise<DeleteResult> {
    const repository = await this.execRepository
    return await repository.delete({ id })
  }

  async updateUser (id: string, infoUpdate: UserEntity): Promise<UpdateResult> {
    const repository = await this.execRepository
    return await repository.update(id, infoUpdate)
  }
}
