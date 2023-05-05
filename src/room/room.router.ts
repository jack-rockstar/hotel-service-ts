import { BaseRoutes } from '../shared/routes/routes'
import { RoomController } from './controllers/room.controllers'
import { RoomMiddleware } from './middleware/room.middleware'

export class RoomRoutes extends BaseRoutes<RoomController, RoomMiddleware> {
  constructor () {
    super(RoomController, RoomMiddleware)
  }

  routes (): any {
    this.router.get('/room', (req, res) => {
      const { id } = req.query
      if (id === undefined) {
        this.controller.getRooms(req, res)
          .catch((err: string) => console.log(`error getRoom: ${err}`))
      } else {
        this.controller.getRoomById(req, res)
          .catch((err: string) => console.log(`error RoomId: ${err}`))
      }
    })
    // this.router.get('/room/:id', (req, res) => {
    //   this.controller.getRoomById(req, res)
    //     .catch((err: string) => console.log(`error RoomId: ${err}`))
    // })
    this.router.post('/createroom', (req, res, next) => [this.middleware.roomValidator(req, res, next)], (req, res) => {
      this.controller.createRoom(req, res)
        .catch((err: string) => console.log(`error createRoom: ${err}`))
    })
    this.router.put('/updateroom/:id', (req, res) => {
      this.controller.updateRoom(req, res)
        .catch((err: string) => console.log(`error updateRoom: ${err}`))
    })
    this.router.delete('/deleteroom/:id', (req, res) => {
      this.controller.deleteRoom(req, res)
        .catch((err: string) => console.log(`error deleteRoom: ${err}`))
    })
  }
}
