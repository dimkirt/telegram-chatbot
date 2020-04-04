const axios = require('axios')
const sharedUtils = require('../shared/utils');

class ImgurApi {
  constructor({ apiClientId, apiClientSecret }) {
    this.apiClientId = apiClientId;
    this.apiClientSecret = apiClientSecret;
    this.client = axios.create({
      baseURL: 'https://api.imgur.com/3/',
    });
    this.client.defaults.headers.common['Authorization'] = `Client-ID ${this.apiClientId}`;
    this.client.defaults.headers.common['Content-Type'] = 'application/json';
    this.client.defaults.headers.common['Cache-Control'] = 'no-cache';
  }

  async getAlbumImages(albumHash) {
    const url = `album/${albumHash}/images`;
    const res = await this.client.get(url).catch(sharedUtils.transformAxiosRejectionToException);
    return res.data.data
  }

  async getSubredditGallery(subredditTitle) {
    const url = `gallery/r/${subredditTitle}`;
    const res = await this.client.get(url).catch(sharedUtils.transformAxiosRejectionToException);
    return res.data.data;
  }
};

module.exports = {
  ImgurApi,
};
