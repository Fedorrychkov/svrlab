'use strict'

class AuthController {
  async login ({ request, response, auth }) {
    const { password, email } = request.only(['password', 'email'])
    try {
      const user = await auth.remember(true).attempt(email, password)
      if (user) {
        response.ok(user)
      }
    } catch (error) {
      response.badRequest(error)
    }
  }

  async getAuth ({ response, auth }) {
    try {
      const user = await auth.getUser()
      response.ok(user)
    } catch (error) {
      response.badRequest(error)
    }
  }

  async logout ({ response, auth }) {
    try {
      await auth.logout()
      response.ok(true)
    } catch (error) {
      response.badRequest(error)
    }
  }
}

module.exports = AuthController
