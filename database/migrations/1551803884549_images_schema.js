'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagesSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.timestamps()

      table.string('path', 254)
      table.string('type', 45)
      table.string('large', 125)
      table.string('preview', 125)
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImagesSchema
