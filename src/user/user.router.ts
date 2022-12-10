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
        .catch((err: string) => console.log(`error getUsers: ${err}`))
    })
    this.router.get('/user/:id', (req, res) => {
      this.controller.getUsersById(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error userId: ${err}`))
    })
    this.router.post('/createuser', (req, res) => {
      this.controller.createUser(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error createUser: ${err}`))
    })
    this.router.put('/updateuser/:id', (req, res) => {
      this.controller.updateUser(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error updateUser: ${err}`))
    })
    this.router.delete('/deleteuser/:id', (req, res) => {
      this.controller.deleteUser(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error deleteUser: ${err}`))
    })
  }
}
