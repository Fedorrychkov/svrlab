import logger from '../utils/logger'
import { __DEV__ } from '../constants/env'

const TIMEOUT = 20000 // 20 sec timeout

function fetchWithTimeout (...args) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const t = setTimeout(() => {
      resolve({ status: 0, error: 'Request timed out' })
    }, TIMEOUT)
    try {
      const res = await fetch(...args)
      resolve(res)
    } finally {
      clearTimeout(t)
    }
  })
}

export default class BaseAPI {
  constructor (baseUrl) {
    if (!baseUrl) {
      throw new Error('Base url is required')
    }
    this.baseUrl = baseUrl
    this.baseHeaders = new Headers()
    this.baseHeaders.append('Content-Type', 'application/json')
    this.baseHeaders.append('Accept', 'application/json')
  }

  authHeaders (token) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${token}`)
    headers.append('Accept', 'application/json')
    return headers
  }

  post (url, body, token = null, showErrorScreenOnFail) {
    const uri = `${this.baseUrl}/${url}`
    const params = {
      method: 'POST',
      headers: token ? this.authHeaders(token) : this.baseHeaders,
      body: JSON.stringify(body),
    }
    // if (!Config.__TEST__) {
    logger.info('POST: ', uri, params)
    // }
    return fetchWithTimeout(uri, params)
      .catch(BaseAPI.throwConnectionError)
      .then(async response => {
        await BaseAPI.validateResponse(response, showErrorScreenOnFail)
        return response
      })
      .then(response => response.json())
  }

  patch (url, body, token = null, showErrorScreenOnFail) {
    const uri = `${this.baseUrl}/${url}`
    const params = {
      method: 'PATCH',
      headers: token ? this.authHeaders(token) : this.baseHeaders,
      body: JSON.stringify(body),
    }
    // if (!Config.__TEST__) {
    logger.info('PATCH: ', uri, params)
    // }
    return fetchWithTimeout(uri, params)
      .catch(BaseAPI.throwConnectionError)
      .then(async response => {
        await BaseAPI.validateResponse(response, showErrorScreenOnFail)
        return response
      })
      .then(response => response.json())
  }

  put (url, body, token = null, showErrorScreenOnFail) {
    const uri = `${this.baseUrl}/${url}`
    const params = {
      method: 'PUT',
      headers: token ? this.authHeaders(token) : this.baseHeaders,
      body: JSON.stringify(body),
    }
    // if (!Config.__TEST__) {
    logger.info('PUT: ', uri, params)
    // }
    return fetchWithTimeout(uri, params)
      .catch(BaseAPI.throwConnectionError)
      .then(async response => {
        await BaseAPI.validateResponse(response, showErrorScreenOnFail)
        return response
      })
      .then(response => response.json())
  }

  get (url, token = null, showErrorScreenOnFail) {
    // if (!Config.__TEST__) {
    logger.info(`GET: ${this.baseUrl}/${url}`)
    // }
    return fetchWithTimeout(`${this.baseUrl}/${url}`, {
      method: 'GET',
      headers: token ? this.authHeaders(token) : this.baseHeaders
    })
      .catch(BaseAPI.throwConnectionError)
      .then(async response => {
        await BaseAPI.validateResponse(response, showErrorScreenOnFail)
        return response
      })
      .then(response => response.json())
  }

  delete (url, body, token = null, showErrorScreenOnFail) {
    // if (!Config.__TEST__) {
    logger.info(`DELETE: ${this.baseUrl}/${url}`)
    // }
    return fetchWithTimeout(`${this.baseUrl}/${url}`, {
      method: 'DELETE',
      headers: token ? this.authHeaders(token) : this.baseHeaders,
      body: JSON.stringify(body),
    })
      .catch(BaseAPI.throwConnectionError)
      .then(async response => {
        await BaseAPI.validateResponse(response, showErrorScreenOnFail)
        return response
      })
      .then(response => response.json())
  }

  /**
   * Throws connection error.
   */
  static throwConnectionError (error) {
    throw new Error(error)
  }

  static async validateResponse (response) {
    // if (Config.__TEST__) return Promise.resolve(true)
    if (__DEV__ && typeof response.clone === 'function') {
      const clonedResponse = response.clone()
      const body = await clonedResponse.json()
      logger.info({
        response,
        body
      })
    } else {
      logger.info(response)
    }

    return Promise.resolve(true)
  }
}