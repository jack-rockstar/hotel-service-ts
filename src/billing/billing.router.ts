import { BaseRoutes } from '../shared/routes/routes'
import { BillingController } from './controllers/billing.controllers'
import { BillingMiddleware } from './middleware/billing.middleware'

export class BillingRoutes extends BaseRoutes<BillingController, BillingMiddleware> {
  constructor () {
    super(BillingController, BillingMiddleware)
  }

  routes (): any {
    this.router.get('/billing', (req, res) => {
      this.controller.getBillings(req, res)
        .catch((err: string) => console.log(`error getBilling: ${err}`))
    })
    this.router.get('/billing/:id', (req, res) => {
      this.controller.getBillingById(req, res)
        .catch((err: string) => console.log(`error BillingId: ${err}`))
    })
    this.router.post('/createbilling', (req, res, next) => [this.middleware.billingValidator(req, res, next)], (req, res) => {
      this.controller.createBilling(req, res)
        .catch((err: string) => console.log(`error createBilling: ${err}`))
    })
    this.router.put('/updatebilling/:id', (req, res) => {
      this.controller.updateBilling(req, res)
        .catch((err: string) => console.log(`error updateBilling: ${err}`))
    })
    this.router.delete('/deletebilling/:id', (req, res) => {
      this.controller.deleteBilling(req, res)
        .catch((err: string) => console.log(`error deleteBilling: ${err}`))
    })
  }
}
