import { BaseRoutes } from '../shared/routes/routes'
import { RentalController } from './controllers/rental.controllers'

export class RentalRoutes extends BaseRoutes<RentalController> {
  constructor () {
    super(RentalController)
  }

  routes (): any {
    this.router.get('/rental', (req, res) => {
      this.controller.getRentals(req, res)
        .then(response => console.log(response))
        .catch((err: string) => console.log(`error getRental: ${err}`))
    })
    this.router.get('/rental/:id', (req, res) => {
      this.controller.getRentalById(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error RentalId: ${err}`))
    })
    this.router.post('/createrental', (req, res) => {
      this.controller.createRental(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error createRental: ${err}`))
    })
    this.router.put('/updateRental/:id', (req, res) => {
      this.controller.updateRental(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error updateRental: ${err}`))
    })
    this.router.delete('/deleteRental/:id', (req, res) => {
      this.controller.deleteRental(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error deleteRental: ${err}`))
    })
  }
}