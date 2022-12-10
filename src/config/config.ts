import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { AppDataSource } from './data.source'

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

  get initConnect (): Promise<DataSource> {
    return AppDataSource.initialize()
  }
}
