import { BaseRoutes } from '../shared/routes/routes'
import { VoucherTypeController } from './controllers/voucherType.controllers'
import { VoucherTypeMiddleware } from './middleware/voucherType.middleware'

export class VoucherRoutes extends BaseRoutes<VoucherTypeController, VoucherTypeMiddleware> {
  constructor () {
    super(VoucherTypeController, VoucherTypeMiddleware)
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
    this.router.post('/createvoucher', (req, res, next) => [this.middleware.voucherTypeValidator(req, res, next)], (req, res) => {
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
