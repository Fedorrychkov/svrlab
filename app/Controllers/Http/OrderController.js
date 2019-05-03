/* eslint-disable no-unused-vars */
'use strict'

const Order = use('App/Models/Order')
const Basket = use('App/Models/Basket')
const Customer = use('App/Models/Customer')
const Database = use('Database')

class OrderController {
  async create ({request, response}) {
    const {
      name,
      country = 'Россия',
      zip,
      city,
      address,
      short,
      phone,
      email,
      total,
      discount,
      deliver,
      basket
    } = request.only([
      'name', 'country', 'zip', 'city', 'address', 'short', 'basket', 'phone', 'email', 'total', 'deliver', 'discount'
    ])
    try {
      let customer = await Database
        .from('customers')
        .where({phone: phone})

      const order = new Order()

      if (!basket && !basket.length) {
        response.badRequest('empty product list')
      }

      if (customer.length) {
        order.customer_id = customer[0].id
      } else {
        customer = new Customer()
        customer.email = email
        customer.phone = phone
        customer.name = name
        customer.country = country
        customer.city = city
        customer.zip = zip
        customer.address = address
        await customer.save()
        order.customer_id = customer.id
      }

      order.status_id = 1
      order.name = name
      order.zip = zip
      order.country = country
      order.city = city
      order.address = address
      order.total = total.toFixed(2) || 0
      order.deliver = deliver || 0
      order.discount = discount || 0
      order.short = short
      await order.save()


      await Promise.all(basket.map(async (item) => {
        // TODO: Сделать отнимание количества товара из корзины ( Inventory - Quantity )
        const product = new Basket()
        product.order_id = order.id
        product.product_id = item.id
        product.quantity = item.quantity || 1
        product.total = (item.quantity * item.cost).toFixed(2) || 0
        product.cost = item.cost.toFixed(2) || 0
        product.discount = item.discount || 0
        await product.save()
      }))
      response.ok({order: order, customer: customer})
    } catch (err) {
      response.badRequest(err)
    }
  }

  async all ({request, response}) {
    try {
      const orders = await Database
        .from('orders')
        .orderBy('updated_at', 'desc')
      response.ok(orders)
    } catch (err) {
      response.badRequest(err)
    }
  }

}

module.exports = OrderController
