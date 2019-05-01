'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()
      table.timestamps()

      table.string('email', 254).notNullable().unique()
      table.string('phone', 20).notNullable().unique()

      table.string('name', 254)
      table.string('country', 254)
      table.string('zip', 254)
      table.string('city', 254)
      table.string('address', 254)
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomerSchema
