const axios = require('axios');
const sharedUtils = require('../shared/utils');

class NewsApi {
  constructor({ apiToken }) {
    this.apiToken = apiToken;
    this.client = axios.create({
      baseURL: 'https://newsapi.org/v1/',
      timeout: 2000,

    });
  }

  /**
     * Get news feed by a news source
     * @param {string} source Id of the source to use
     */
  async getArticlesBySource(source) {
    const url = `articles?source=${source}&sortBy=top&apiKey=${this.apiToken}`;
    const res = await this.client.get(url).catch(sharedUtils.transformAxiosRejectionToException);
    return res.data.articles;
  }

  /**
     * Get all available news sources
     */
  async getSources() {
    const url = `sources?apiKey=${this.apiToken}`;
    const res = await this.client.get(url).catch(sharedUtils.transformAxiosRejectionToException);
    return res.data.sources;
  }
}

module.exports = {
  NewsApi,
};
