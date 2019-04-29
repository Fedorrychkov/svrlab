'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MusicSchema extends Schema {
  up () {
    this.create('music', (table) => {
      table.increments()
      table.timestamps()

      table.string('name', 90).notNullable()
      table.string('short', 300)

      table.string('images')
      table.integer('mainPhoto')
      table.string('customFields')
      table.integer('inventory').notNullable().defaultTo(0)
      table.boolean('isAvailable').notNullable().defaultTo(true)
      table.integer('cost').notNullable().defaultTo(0)
    })
  }

  down () {
    this.drop('music')
  }
}

module.exports = MusicSchema
