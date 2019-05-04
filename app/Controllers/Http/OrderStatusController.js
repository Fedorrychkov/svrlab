'use strict'

const OrderStatus = use('App/Models/OrderStatus')

class OrderStatusController {
  async all ({response}) {
    try {
      const statuses = await OrderStatus.all()
      response.ok(statuses)
    } catch (err) {
      response.badRequest(err)
    }
  }
}

module.exports = OrderStatusController
