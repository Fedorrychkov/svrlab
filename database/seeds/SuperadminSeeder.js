'use strict'
const User = use('App/Models/User')
const Env = use('Env')
const Hash = use('Hash')

const SUPERADMIN_PASSWORD = Env.get('SUPERADMIN_PASSWORD')
const SUPERADMIN_LOGIN = Env.get('SUPERADMIN_LOGIN')
const SUPERADMIN_PHONE = Env.get('SUPERADMIN_PHONE')
/*
|--------------------------------------------------------------------------
| SuperadminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

class SuperadminSeeder {
  async run () {
    const user = {
      id: -1,
      role: 'SUPER_ADMIN_ROLE',
      phone: SUPERADMIN_PHONE,
      email: SUPERADMIN_LOGIN,
      password: SUPERADMIN_PASSWORD
    }

    await User.truncate()
    await User.create(user)
  }
}

module.exports = SuperadminSeeder
