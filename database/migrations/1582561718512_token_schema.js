'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokenSchema extends Schema {
  up () {
    this.create('tokens', (table) => {
      table.increments()
      table.timestamps()

      table.boolean('is_revoked')
      table.string('token')
      table.string('type')
      table.integer('user_id')
    })
  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokenSchema
