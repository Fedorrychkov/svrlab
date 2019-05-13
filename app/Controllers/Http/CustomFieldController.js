'use strict'
const CustomField = use('App/Models/CustomField')
const Database = use('Database')

class CustomFieldController {
  async all ({response}) {
    try {
      response.ok(await CustomField.all())
    } catch (error) {
      response.badRequest(error)
    }
  }

  async getByType ({response, params}) {
    try {
      const fields = await Database
        .from('custom-fields')
        .where('type', '=', params.type)
      response.ok(fields)
    } catch (error) {
      response.badRequest(error)
    }
  }

  async create ({response, request}) {
    try {
      const {
        type,
        name
      } = request.only(['type', 'name'])
      const field = new CustomField()
      field.type = type
      field.name = name
      response.ok(await field.save())
    } catch (error) {
      response.badRequest(error)
    }
  }
}

module.exports = CustomFieldController
