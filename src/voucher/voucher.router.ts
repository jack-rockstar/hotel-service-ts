import { BaseRoutes } from '../shared/routes/routes'
import { VoucherController } from './controllers/voucher.controllers'

export class VoucherRoutes extends BaseRoutes<VoucherController> {
  constructor () {
    super(VoucherController)
  }

  routes (): any {
    this.router.get('/vouchers', (req, res) => {
      this.controller.getVouchers(req, res)
        .then(response => console.log(response))
        .catch((err: string) => console.log(`error getVouchers: ${err}`))
    })
    this.router.get('/voucher/:id', (req, res) => {
      this.controller.getVoucherById(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error VoucherId: ${err}`))
    })
    this.router.post('/createvoucher', (req, res) => {
      this.controller.createVoucher(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error createVoucher: ${err}`))
    })
    this.router.put('/updatevoucher/:id', (req, res) => {
      this.controller.updateVoucher(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error updateVoucher: ${err}`))
    })
    this.router.delete('/deletevoucher/:id', (req, res) => {
      this.controller.deleteVoucher(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error deleteVoucher: ${err}`))
    })
  }
}
