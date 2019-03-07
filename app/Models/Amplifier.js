'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Amplifier extends Model {
  mainPhoto() {
    return this.hasOne('App/Models/Image')
  }

  images() {
    return this.hasMany('App/Models/Image')
  }
}

module.exports = Amplifier
