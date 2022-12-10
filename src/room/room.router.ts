import { BaseRoutes } from '../shared/routes/routes'
import { RoomController } from './controllers/room.controllers'

export class RoomRoutes extends BaseRoutes<RoomController> {
  constructor () {
    super(RoomController)
  }

  routes (): any {
    this.router.get('/room', (req, res) => {
      this.controller.getRooms(req, res)
        .then(response => console.log(response))
        .catch((err: string) => console.log(`error getRoom: ${err}`))
    })
    this.router.get('/Room/:id', (req, res) => {
      this.controller.getRoomById(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error RoomId: ${err}`))
    })
    this.router.post('/createroom', (req, res) => {
      this.controller.createRoom(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error createRoom: ${err}`))
    })
    this.router.put('/updateroom/:id', (req, res) => {
      this.controller.updateRoom(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error updateRoom: ${err}`))
    })
    this.router.delete('/deleteroom/:id', (req, res) => {
      this.controller.deleteRoom(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error deleteRoom: ${err}`))
    })
  }
}
