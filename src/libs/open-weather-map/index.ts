import axios, { AxiosError, AxiosInstance } from 'axios';
import { isAxiosError } from '../util';

interface IOpenWeatherApiProps {
  apiToken: string;
  language: string;
  unitSystem: string;
}

export class OpenWeatherApi {
  private apiToken: string;
  private language: string;
  private unitSystem: string;
  private client: AxiosInstance;
  
  constructor({ apiToken, language, unitSystem = 'metric' }: IOpenWeatherApiProps) {
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
  async getWeatherByCity(city: string, country: string): Promise<any[]> {
    const url = `weather?q=${city},${country}&appid=${this.apiToken}&lang=${this.language}&units=${this.unitSystem}`;
    const res = await this.client.get(url).catch(OpenWeatherError);
    return res.data;
  }
}

function OpenWeatherError(error: AxiosError | Error): never {
  if (isAxiosError(error) && error.response) {
    throw new Error(error.response.data.message);
  }
  throw error;
}
