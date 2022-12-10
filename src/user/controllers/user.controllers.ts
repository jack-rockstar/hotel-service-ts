import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {
  private readonly userService: UserService = new UserService()

  async getUsers (_req: Request, res: Response): Promise<any> {
    try {
      console.log('===BIENVENIDO===')
      const data = await this.userService.findAllUser()
      console.log(data)
      return res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return res.status(404).json(error)
    }
  }

  async getUsersById (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const data = await this.userService.findUserById(id)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
    }
  }

  async createUser (req: Request, res: Response): Promise<any> {
    try {
      const data = await this.userService.createUser(req.body)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
    }
  }

  async updateUser (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const data = await this.userService.updateUser(id, req.body)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUser (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const data = await this.userService.deleteUser(id)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
    }
  }
}
