const axios = require('axios');
const sharedUtils = require('../shared/utils');

class OpenWeatherApi {
  constructor({ apiToken, language, unitSystem = 'metric' }) {
    this.apiToken = apiToken;
    this.language = language;
    this.unitSystem = unitSystem;
    this.client = axios.create({
      baseURL: 'http://api.openweathermap.org/data/2.5/',
      timeout: 2000,
    });
  }

  /**
    * Get weather data for a specific city
    *
    * @param {string} city The name of the city in English e.g. "Thessaloniki"
    * @param {string} country The ISO 3166 country code in lowercase e.g. "gr"
    */
  async getWeatherByCity(city, country) {
    const url = `weather?q=${city},${country}&appid=${this.apiToken}&lang=${this.language}&units=${this.unitSystem}`;
    const res = await this.client.get(url).catch(sharedUtils.transformAxiosRejectionToException);
    return res.data;
  }
}

module.exports = {
  OpenWeatherApi,
};
