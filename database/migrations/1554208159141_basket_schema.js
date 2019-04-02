'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BasketSchema extends Schema {
  up () {
    this.create('baskets', (table) => {
      table.increments()
      table.timestamps()
      table.integer('product_id')
      table.integer('quantity')
      table.text('user_token')
      table.integer('user_id')
      table.float('cost')
      table.float('discount').defaultTo(0)
      table.integer('order_id')
    })
  }

  down () {
    this.drop('baskets')
  }
}

module.exports = BasketSchema
