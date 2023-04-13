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
    this.router.get('/', (_req, res) => {
      res.status(200).json({ status: 200, message: 'Service Currently' })
    })

    this.router.post('/login', this.middleware.passAuth('login'), (req, res) => {
      this.controller.login(req, res)
        .catch((err: any) => {
          this.httpResponse.Error(res, err)
        })
    })
  }
}
