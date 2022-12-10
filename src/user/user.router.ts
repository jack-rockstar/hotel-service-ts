import { UserController } from './controllers/user.controllers'
import { BaseRoutes } from '../shared/routes/routes'

export class UserRoutes extends BaseRoutes<UserController> {
  constructor () {
    super(UserController)
  }

  routes (): any {
    this.router.get('/users', (req, res) => {
      this.controller.getUsers(req, res)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    })
    // this.router.get('/user/:id', async (req, res) => await this.controller.getUsersById(req, res))
    this.router.post('/createuser', (req, res) => {
      this.controller.createUser(req, res)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    })
    // this.router.put('/updateuser/:id', async (req, res) => await this.controller.updateUser(req, res))
    // this.router.delete('/deleteuser/:id', async (req, res) => await this.controller.deleteUser(req, res))
  }
}
