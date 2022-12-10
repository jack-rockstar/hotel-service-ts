import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../shared/response/http.response'
import { UserService } from '../services/user.service'

export class UserController {
  private readonly userService: UserService = new UserService()
  private readonly httpReponse: HttpResponse = new HttpResponse()

  async getUsers (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET USERS===')
      const data = await this.userService.findAllUser()
      if (data.length === 0) return this.httpReponse.NotFound(res, 'No existe informacion')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      console.log(error)
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET USERS===')
    }
  }

  async getUsersById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET USER BY ID===')

      const { id } = req.params
      const data = await this.userService.findUserById(id)
      if (data == null) {
        return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      }
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET USER BY ID===')
    }
  }

  async createUser (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE USER===')
      const data = await this.userService.createUser(req.body)

      if (data.driverError?.name === 'error') {
        return this.httpReponse.NotFound(res, data.driverError)
      }
      return this.httpReponse.Ok(res, data)
    } catch (error: object | any) {
      return this.httpReponse.Error(res, (Boolean(error.driverError?.detail)) || error)
    } finally {
      console.log('===END API CREATE USER===')
    }
  }

  async updateUser (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE USER===')
      const { id } = req.params
      const data: UpdateResult | null = await this.userService.updateUser(id, req.body)

      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')

      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET UPDATE USER===')
    }
  }

  async deleteUser (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE USER===')

      const { id } = req.params
      const data: DeleteResult | null = await this.userService.deleteUser(id)
      if (data == null) return this.httpReponse.NotFound(res, 'No se encontro informacion con el ID especificado')
      return this.httpReponse.Ok(res, data)
    } catch (error) {
      return this.httpReponse.Error(res, error)
    } finally {
      console.log('===END API GET DELETE USER===')
    }
  }
}
