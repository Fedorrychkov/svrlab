'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderStatusSchema extends Schema {
  up () {
    this.create('order_statuses', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('title')
    })
  }

  down () {
    this.drop('order_statuses')
  }
}

module.exports = OrderStatusSchema
