'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AmplifiersSchema extends Schema {
  up () {
    this.table('amplifiers', (table) => {
      // alter table
      table.integer('inventory').notNullable().defaultTo(0)
      table.boolean('isAvailable').notNullable().defaultTo(true)
    })
  }

  down () {
    this.table('amplifiers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AmplifiersSchema
