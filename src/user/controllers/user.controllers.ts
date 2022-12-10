import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {
  private readonly userService: UserService = new UserService()

  async getUsers (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET USERS===')
      const data = await this.userService.findAllUser()
      console.log(data)
      return res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET USERS===')
    }
  }

  async getUsersById (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET USER BY ID===')

      const { id } = req.params
      const data = await this.userService.findUserById(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET USER BY ID===')
    }
  }

  async createUser (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API CREATE USER===')

      const data = await this.userService.createUser(req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API CREATE USER===')
    }
  }

  async updateUser (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET UPDATE USER===')
      const { id } = req.params
      const data = await this.userService.updateUser(id, req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET UPDATE USER===')
    }
  }

  async deleteUser (req: Request, res: Response): Promise<any> {
    try {
      console.log('===INITIALIZING API GET DELETE USER===')

      const { id } = req.params
      const data = await this.userService.deleteUser(id)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(404).json(error)
    } finally {
      console.log('===END API GET DELETE USER===')
    }
  }
}
