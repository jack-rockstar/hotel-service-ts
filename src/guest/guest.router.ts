import { BaseRoutes } from '../shared/routes/routes'
import { GuestController } from './controllers/guest.controllers'

export class GuestRoutes extends BaseRoutes<GuestController> {
  constructor () {
    super(GuestController)
  }

  routes (): any {
    this.router.get('/guest', (req, res) => {
      this.controller.getGuest(req, res)
        .catch((err: string) => console.log(`error getGuest: ${err}`))
    })
    this.router.get('/guest/:id', (req, res) => {
      this.controller.getGuestById(req, res)
        .catch((err: string) => console.log(`error GuestId: ${err}`))
    })
    this.router.post('/createguest', (req, res) => {
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
