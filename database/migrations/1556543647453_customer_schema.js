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

      table.string('first_name', 80)
      table.string('last_name', 80)
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomerSchema
