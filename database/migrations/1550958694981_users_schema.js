'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.timestamps()

      table.string('login', 80)

      table.string('email', 254).notNullable().unique()
      table.string('phone', 20).notNullable().unique()
      table.string('password', 80).notNullable()

      table.string('first_name', 80)
      table.string('middle_name', 80)
      table.string('last_name', 80)

      table.enu('gender', ['male', 'female', 'other'])

      table.string('role')

      table.boolean('active').notNullable().defaultTo(true)

      table.integer('balance').defaultTo(0)
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema
