import { UserController } from './controllers/user.controllers'
import { BaseRoutes } from '../shared/routes/routes'
import { HttpResponse } from '../shared/response/http.response'

export class UserRoutes extends BaseRoutes<UserController> {
  constructor () {
    super(UserController)
  }

  private readonly httpResponse: HttpResponse = new HttpResponse()

  routes (): any {
    this.router.get('/users', (req, res) => {
      this.controller.getUsers(req, res)
        .catch((err: any) => {
          this.httpResponse.Error(res, err)
        })
    })
    this.router.get('/user/:id', (req, res) => {
      this.controller.getUsersById(req, res)
        .catch((err: any) => {
          this.httpResponse.Error(res, err)
        })
    })
    this.router.post('/createuser', (req, res) => {
      this.controller.createUser(req, res)
        .catch((err: any) => {
          this.httpResponse.Error(res, err)
        })
    })
    this.router.put('/updateuser/:id', (req, res) => {
      this.controller.updateUser(req, res)
        .catch((err: any) => {
          this.httpResponse.Error(res, err)
        })
    })
    this.router.delete('/deleteuser/:id', (req, res) => {
      this.controller.deleteUser(req, res)
        .catch((err: any) => {
          this.httpResponse.Error(res, err)
        })
    })
  }
}
