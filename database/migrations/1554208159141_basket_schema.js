'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BasketSchema extends Schema {
  up () {
    this.create('baskets', (table) => {
      table.increments()
      table.timestamps()
      table.integer('order_id')
      table.integer('product_id')
      table.integer('quantity')
      table.float('total').defaultTo(0)
      table.float('cost').defaultTo(0)
      table.float('discount').defaultTo(0)
    })
  }

  down () {
    this.drop('baskets')
  }
}

module.exports = BasketSchema
