'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomFieldsSchema extends Schema {
  up () {
    this.create('custom_fields', (table) => {
      table.increments()
      table.timestamps()
      table.string('type', 300)
      table.string('name', 300)
    })
  }

  down () {
    this.drop('custom_fields')
  }
}

module.exports = CustomFieldsSchema
