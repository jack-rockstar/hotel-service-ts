import { BaseRoutes } from '../shared/routes/routes'
import { RentalController } from './controllers/rental.controllers'
import { RentalMiddleware } from './middleware/rental.middleware'

export class RentalRoutes extends BaseRoutes<RentalController, RentalMiddleware> {
  constructor() {
    super(RentalController, RentalMiddleware)
  }

  routes(): any {
    this.router.get('/rental', (req, res) => {
      const { id } = req.query
      if (!id) {
        this.controller.getRentals(req, res)
          .catch((err: string) => console.log(`Error getRental: ${err}`))
      } else {
        this.controller.getRentalById(req, res).catch((err: string) => `Error getRental: ${err}`)
      }
    })

    this.router.post('/rental', (req, res, next) => [this.middleware.rentalValidator(req, res, next)], (req, res) => {
      this.controller.createRental(req, res)
        .catch((err: string) => console.log(`error createRental: ${err}`))
    })
    this.router.put('/updaterental/:id', (req, res) => {
      this.controller.updateRental(req, res)
        .catch((err: string) => console.log(`error updateRental: ${err}`))
    })
    this.router.delete('/deleterental/:id', (req, res) => {
      this.controller.deleteRental(req, res)
        .catch((err: string) => console.log(`error deleteRental: ${err}`))
    })
  }
}
