import { UserController } from './controllers/user.controllers'
import { BaseRoutes } from '../shared/routes/routes'

export class UserRoutes extends BaseRoutes<UserController> {
  constructor () {
    super(UserController)
  }

  routes (): void {
    this.router.get('/user', (req, res) => this.controller.getUser(req, res))
  }
}
