import { BaseRoutes } from '../shared/routes/routes'
import { RoomTypeController } from './controllers/roomType.controllers'
import { RoomTypeMiddleware } from './middleware/roomType.middleware'

export class RoomTypeRoutes extends BaseRoutes<RoomTypeController, RoomTypeMiddleware> {
  constructor () {
    super(RoomTypeController, RoomTypeMiddleware)
  }

  routes (): any {
    this.router.get('/roomtypes', (req, res) => {
      this.controller.getRoomTypes(req, res)
        .catch((err: string) => console.log(`error getRoomTypes: ${err}`))
    })
    this.router.get('/roomtype/:id', (req, res) => {
      this.controller.getRoomTypeById(req, res)
        .catch((err: string) => console.log(`error RoomTypeId: ${err}`))
    })
    this.router.post('/createroomtype', (req, res, next) => [this.middleware.roomTypeValidator(req, res, next)], (req, res) => {
      this.controller.createRoomType(req, res)
        .catch((err: string) => console.log(`error createRoomType: ${err}`))
    })
    this.router.put('/updateroomtype/:id', (req, res) => {
      this.controller.updateRoomType(req, res)
        .catch((err: string) => console.log(`error updateRoomType: ${err}`))
    })
    this.router.delete('/deleteroomtype/:id', (req, res) => {
      this.controller.deleteRoomType(req, res)
        .catch((err: string) => console.log(`error deleteRoomType: ${err}`))
    })
  }
}
