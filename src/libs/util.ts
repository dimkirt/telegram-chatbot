import { AxiosError } from 'axios';

export function isAxiosError(error: AxiosError | Error): error is AxiosError  {
  return (error as AxiosError).isAxiosError === true;
}
