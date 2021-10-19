/* eslint-disable no-unused-vars */

const axios = require('axios')
const LadderType = require('./LadderType.js')

class Client {
  /**
   *
   * @param {String} key - Your Steam Ladder API key
   * @param {String} [baseUrl] - Base URL for the API. I don't know, maybe you're using some kind of proxy?
   */
  constructor (key, baseUrl = 'https://steamladder.com/api/v1') {
    this.key = key
    this.baseUrl = baseUrl
  }

  /**
   * Performs a GET request to and endpoint on the API
   * @param {String} enpoint - Endpoint to perform the request to
   * @returns {Promise} - Returned promise
   */
  get (enpoint) {
    return axios.get(`${this.baseUrl}${enpoint}`, {
      headers: {
        Authorization: `Token ${this.key}`
      }
    }).then(res => res.data)
  }

  /**
   * Performs a POST request to and endpoint on the API
   * @param {String} enpoint - Endpoint to perform the request to
   * @returns {Promise} - Returned promise
   */
  post (enpoint) {
    return axios(`${this.baseUrl}${enpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${this.key}`
      }
    }).then(res => res.json())
  }

  /**
   * Get profile details including ladder ranking.
   * @param {String} steamid64 - SteamID64 of the user your want to get details about
   * @returns {Promise} - Returned promise
   */
  getProfile (steamid64) {
    return this.get(`/profile/${steamid64}`)
  }

  /**
   * Update profile details and return latest profile details including ladder rankings.
   * @param {String} steamid64 - SteamID64 of the user your want to get updated details about
   * @returns {Promise} - Returned promise
   */
  updateProfile (steamid64) {
    return this.post(`/profile/${steamid64}/`)
  }

  /**
   * Gets a specific ladder
   * @param {LadderType} type - The type of ladder you want to get details about
   * @param {String} [regionOrCountry] - Region to filter the ladder by
   * @returns {Promise} - Returned promise
   */
  getLadder (type, regionOrCountry) {
    return this.get(`/ladder/${type}${regionOrCountry ? `/${regionOrCountry}` : ''}`)
  }
}

module.exports = Client

/* eslint-disable no-unused-vars */
