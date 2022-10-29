import { env } from '../types/index.type';

interface IConfig {
  NODE_ENV: env;
  PORT: number;
  GODADDY_API_KEY: string;
  GODADDY_API_SECRET: string;
  GODADDY_BASEURL: string;
}

export default IConfig;
