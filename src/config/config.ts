import * as dotenv from 'dotenv'
import path from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Connection, ConnectionOptions, createConnection } from 'typeorm'

export abstract class ConfigServer {
  constructor () {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv)
    dotenv.config({
      path: nodeNameEnv
    })
  }

  public getEnviroment (key: string): string | undefined {
    return process.env[key]
  }

  public getNumberEnv (params: string): number {
    return Number(this.getEnviroment(params))
  }

  public get nodeEnv (): string {
    return this.getEnviroment('NODE_ENV')?.trim() ?? ''
  }

  public createPathEnv (path: string): string {
    const arrEnv: String[] = ['env']
    if (path.length > 0) {
      const stringArray: String[] = path.split('.')
      arrEnv.unshift(...stringArray)
    }
    return `.${arrEnv.join('.')}`
  }

  public get typeORMConfig (): ConnectionOptions {
    return {
      type: 'postgres',
      host: this.getEnviroment('DB_HOST'),
      port: this.getNumberEnv('DB_PORT'),
      username: this.getEnviroment('DB_USER'),
      password: this.getEnviroment('DB_PASSWORD'),
      database: this.getEnviroment('DB_POSTGRES_DB'),
      entities: [`${path.join(__dirname)}/../**/*.entity{.ts, .js}`],
      migrations: [`${path.join(__dirname)}/../../migrations/*{.ts, .js}`],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy()

    }
  }

  async dbConnect (): Promise<Connection> {
    return await createConnection(this.typeORMConfig)
  }
}
