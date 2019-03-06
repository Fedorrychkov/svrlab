'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AmplifiersSchema extends Schema {
  up () {
    this.table('amplifiers', (table) => {
      // alter table
      table.integer('cost').notNullable().defaultTo(0)
    })
  }

  down () {
    this.table('amplifiers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AmplifiersSchema
