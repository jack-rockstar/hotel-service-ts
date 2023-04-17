import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV !== undefined ? `.${process.env.NODE_ENV.trim()}.env` : '.env'
})
console.log(process.env.NODE_ENV)
console.log(`${path.join(__dirname, '../../src')}`)
const Config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_POSTGRES_DB,
  entities: [`${path.join(__dirname, '../../src')}/**/*.entity{.ts,.js}`],
  migrations: [`${path.join(__dirname)}/../migrations/*{.ts, .js}`],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy()

}

export const AppDataSource: DataSource = new DataSource(Config)
