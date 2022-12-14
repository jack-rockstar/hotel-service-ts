import { BaseRoutes } from '../shared/routes/routes'
import { VoucherController } from './controllers/voucher.controllers'
import { VoucherMiddleware } from './middleware/voucher.middleware'

export class VoucherRoutes extends BaseRoutes<VoucherController, VoucherMiddleware> {
  constructor () {
    super(VoucherController, VoucherMiddleware)
  }

  routes (): any {
    this.router.get('/vouchers', (req, res) => {
      this.controller.getVouchers(req, res)
        .catch((err: string) => console.log(`error getVouchers: ${err}`))
    })
    this.router.get('/voucher/:id', (req, res) => {
      this.controller.getVoucherById(req, res)
        .catch((err: string) => console.log(`error VoucherId: ${err}`))
    })
    this.router.post('/createvoucher', (req, res, next) => [this.middleware.voucherValidator(req, res, next)], (req, res) => {
      this.controller.createVoucher(req, res)
        .catch((err: string) => console.log(`error createVoucher: ${err}`))
    })
    this.router.put('/updatevoucher/:id', (req, res) => {
      this.controller.updateVoucher(req, res)
        .catch((err: string) => console.log(`error updateVoucher: ${err}`))
    })
    this.router.delete('/deletevoucher/:id', (req, res) => {
      this.controller.deleteVoucher(req, res)
        .catch((err: string) => console.log(`error deleteVoucher: ${err}`))
    })
  }
}
