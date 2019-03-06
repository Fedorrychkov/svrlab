'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AmplifiersSchema extends Schema {
  up () {
    this.create('amplifiers', (table) => {
      table.increments()
      table.timestamps()

      table.string('name', 90).notNullable()
      table.string('short', 300)

      table.string('images')
      table.integer('mainPhoto')
      table.string('customFields')
    })
  }

  down () {
    this.drop('amplifiers')
  }
}

module.exports = AmplifiersSchema
