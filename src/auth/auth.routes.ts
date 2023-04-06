import { AuthMiddleware } from '../shared/middlewares/auth.middleware'
import { HttpResponse } from '../shared/response/http.response'
import { BaseRoutes } from '../shared/routes/routes'
import { AuthController } from './controllers/auth.controller'

export class AuthRoutes extends BaseRoutes<AuthController, AuthMiddleware> {
  constructor () {
    super(AuthController, AuthMiddleware)
  }

  private readonly httpResponse: HttpResponse = new HttpResponse()

  public routes (): void {
    this.router.post('/login', this.middleware.passAuth('login'), (req, res) => {
      this.controller.login(req, res)
        .catch((err: any) => {
          console.log('AAA')
          this.httpResponse.Error(res, err)
        })
    })
  }
}
