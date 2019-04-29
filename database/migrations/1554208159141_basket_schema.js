'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BasketSchema extends Schema {
  up () {
    this.create('baskets', (table) => {
      table.increments()
      table.timestamps()
      table.integer('product_id')
      table.string('product_type') // AMPLIFIER, MUSIC
      table.integer('quantity')
      table.integer('user_id') // If user is auth
      table.integer('customer_id') // If anonymus user
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
