import { BaseRoutes } from '../shared/routes/routes'
import { GuestController } from './controllers/guest.controllers'
import { GuestMiddleware } from './middleware/guest.middleware'

export class GuestRoutes extends BaseRoutes<GuestController, GuestMiddleware> {
  constructor() {
    super(GuestController, GuestMiddleware)
  }

  routes(): any {
    this.router.get('/guest', (req, res) => {
      const { id } = req.query
      if (!id) {
        this.controller.getGuest(req, res)
          .catch((err: string) => console.log(`Error getGuests: ${err}`))
        return
      }
      this.controller.getGuestById(req, res)
        .catch((err: string) => console.log(`error getGuest by id: ${err}`))
    })
    this.router.get('/guest', (req, res) => {
      this.controller.getHuespedByDoc(req, res)
        .catch((err: string) => console.log(`Error en buscar el usuario por documento: ${err} `))
    })
    // this.router.get('/guest/:id', (req, res) => {
    //   this.controller.getGuestById(req, res)
    //     .catch((err: string) => console.log(`error GuestId: ${err}`))
    // })
    this.router.post('/guest', (req, res, next) => [this.middleware.guestValidator(req, res, next)], (req, res) => {
      this.controller.createGuest(req, res)
        .catch((err: string) => console.log(`error createGuest: ${err}`))
    })
    this.router.put('/updateguest/:id', (req, res) => {
      this.controller.updateGuest(req, res)
        .catch((err: string) => console.log(`error updateGuest: ${err}`))
    })
    this.router.delete('/deleteguest/:id', (req, res) => {
      this.controller.deleteGuest(req, res)
        .catch((err: string) => console.log(`error deleteGuest: ${err}`))
    })
  }
}
