import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import { UserEntity } from '../entities/user.entity'
import { RoleType, UserDto } from '../validation/user.dto'
import * as bcrypt from 'bcrypt'

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity)
  }

  async findAllUser(): Promise<UserEntity[]> {
    const repository = await this.execRepository
    return await repository.find()
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    const repository = await this.execRepository

    try {
      const data = await repository.findOne({ where: { id } })
      if (data == null) throw new Error('No se encontro informacion con el ID especificado')

      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const repository = await this.execRepository

    try {
      return await repository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ email })
        .getOne()
    } catch (error) {
      return null
    }
  }

  async findUserByUser(user: string): Promise<UserEntity | null> {
    const repository = await this.execRepository

    try {
      return await repository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ user })
        .getOne()
    } catch (error) {
      return null
    }
  }

  async findUserWithRole(id: string, role: RoleType): Promise<UserEntity | null> {
    const repository = await this.execRepository
    return await repository
      .createQueryBuilder('user')
      .where({ id })
      .andWhere({ role })
      .getOne()
  }

  async createUser(body: UserDto): Promise<UserEntity | any> {
    const repository = await this.execRepository
    try {
      const newUser = repository.create(body)
      const hash = await bcrypt.hash(newUser.password, 10)
      newUser.password = hash
      const data = await repository.save(newUser)
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteUser(id: string): Promise<DeleteResult | null> {
    const repository = await this.execRepository
    try {
      const data: DeleteResult = await repository.delete({ id })
      console.log(data)
      if (Number(data?.affected) < 1) throw new Error('No se encontro informacion con el ID especificado')

      return data
    } catch (error) {
      return null
    }
  }

  async updateUser(id: string, infoUpdate: UserEntity): Promise<UpdateResult | null> {
    const repository = await this.execRepository
    try {
      const data = await repository.update(id, infoUpdate)
      if (data == null) throw new Error('No se encontro informacion con el ID especificado')

      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
