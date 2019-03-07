'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagesSchema extends Schema {
  up () {
    this.table('images', (table) => {
      // alter table
      table.integer('amplifier_id').defaultTo(null)
      table.integer('user_id').defaultTo(null)
      table.integer('music_id').defaultTo(null)
    })
  }

  down () {
    this.table('images', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ImagesSchema
