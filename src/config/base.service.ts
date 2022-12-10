import { EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ConfigServer } from './config'

export class BaseService<Entity extends BaseEntity> extends ConfigServer {
  public execRepository!: Promise<Repository<Entity>>

  constructor (public getEntity: EntityTarget<Entity>) {
    super()
    this.execRepository = this.initRepository(getEntity)
  }

  async initRepository<Entity extends ObjectLiteral>(e: EntityTarget<Entity>): Promise<Repository<Entity>> {
    const getConn = await this.dbConnect()
    return getConn.getRepository(e)
  }
}
