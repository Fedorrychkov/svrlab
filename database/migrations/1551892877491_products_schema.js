'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.timestamps()

      table.string('name', 90).notNullable()
      table.string('short', 300)

      table.string('images')
      table.string('type')
      table.integer('mainPhoto')
      table.string('customFields')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
