import { BaseRoutes } from '../shared/routes/routes'
import { BillingController } from './controllers/billing.controllers'

export class BillingRoutes extends BaseRoutes<BillingController> {
  constructor () {
    super(BillingController)
  }

  routes (): any {
    this.router.get('/billing', (req, res) => {
      this.controller.getBillings(req, res)
        .then(response => console.log(response))
        .catch((err: string) => console.log(`error getBilling: ${err}`))
    })
    this.router.get('/billing/:id', (req, res) => {
      this.controller.getBillingById(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error BillingId: ${err}`))
    })
    this.router.post('/createbilling', (req, res) => {
      this.controller.createBilling(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error createBilling: ${err}`))
    })
    this.router.put('/updatebilling/:id', (req, res) => {
      this.controller.updateBilling(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error updateBilling: ${err}`))
    })
    this.router.delete('/deletebilling/:id', (req, res) => {
      this.controller.deleteBilling(req, res)
        .then((response: any) => console.log(response))
        .catch((err: string) => console.log(`error deleteBilling: ${err}`))
    })
  }
}
