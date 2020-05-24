import axios, { AxiosError, AxiosInstance } from 'axios';
import { isAxiosError } from '../util';

interface INewsApiProps {
  apiToken: string;
}

export class NewsApi {
  private apiToken: string;
  private client: AxiosInstance;

  constructor({ apiToken }: INewsApiProps) {
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
  async getArticlesBySource(source: string): Promise<any[]> {
    const url = `articles?source=${source}&sortBy=top&apiKey=${this.apiToken}`;
    const res = await this.client.get(url).catch(NewsError);
    return res.data.articles;
  }

  /**
     * Get all available news sources
     */
  async getSources(): Promise<any[]> {
    const url = `sources?apiKey=${this.apiToken}`;
    const res = await this.client.get(url).catch(NewsError);
    return res.data.sources;
  }
}

function NewsError(error: AxiosError | Error): never {
  if (isAxiosError(error) && error.response) {
    throw new Error(error.response.data.message);
  }
  throw error;
}
