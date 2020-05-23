import axios, { AxiosError, AxiosInstance } from 'axios';
import { isAxiosError } from '../util';

interface IImgurApiProps {
  apiClientId: string;
  apiClientSecret: string;
}

export class ImgurApi {
  private apiClientId: string;
  private apiClientSecret: string;
  private client: AxiosInstance;

  constructor({ apiClientId, apiClientSecret }: IImgurApiProps) {
    this.apiClientId = apiClientId;
    this.apiClientSecret = apiClientSecret;
    this.client = axios.create({
      baseURL: 'https://api.imgur.com/3/',
    });
    this.client.defaults.headers.common.Authorization = `Client-ID ${this.apiClientId}`;
    this.client.defaults.headers.common['Content-Type'] = 'application/json';
    this.client.defaults.headers.common['Cache-Control'] = 'no-cache';
  }

  async getAlbumImages(albumHash: string): Promise<any[]> {
    const url = `album/${albumHash}/images`;
    const res = await this.client.get(url).catch(ImgurError);
    return res.data.data;
  }

  async getSubredditGallery(subredditTitle: string): Promise<any[]> {
    const url = `gallery/r/${subredditTitle}`;
    const res = await this.client.get(url).catch(ImgurError);
    return res.data.data;
  }
}

function ImgurError(error: AxiosError | Error): never {
  if (isAxiosError(error) && error.response) {
    throw new Error(error.response.statusText);
  }
  throw error;
}
