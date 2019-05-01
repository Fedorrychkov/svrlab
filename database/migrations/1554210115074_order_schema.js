'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.timestamps()
      table.integer('customer_id')
      table.integer('status_id')

      table.string('name', 254)
      table.string('country', 254)
      table.string('zip', 254)
      table.string('city', 254)
      table.string('address', 254)
      table.float('total').defaultTo(0)
      table.float('discount').defaultTo(0)
      table.float('deliver').defaultTo(0)
      table.text('short')
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
