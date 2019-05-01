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
      order.total = total
      order.deliver = deliver
      order.discount = discount
      order.short = short
      await order.save()
      response.ok({order: order, customer: customer})
    } catch (err) {
      response.badRequest(err)
    }
  }
}

module.exports = OrderController
