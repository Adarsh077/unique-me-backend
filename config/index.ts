import dotenv from 'dotenv';
import { IConfig } from '../interfaces';

dotenv.config();

const config: IConfig = {
  NODE_ENV:
    process.env.NODE_ENV === 'production' ? 'production' : 'development',
  PORT: parseInt(process.env.PORT || '') || 8000,
  GODADDY_API_KEY: process.env.GODADDY_API_KEY ?? '',
  GODADDY_API_SECRET: process.env.GODADDY_API_SECRET ?? '',
  GODADDY_BASEURL: process.env.GODADDY_BASEURL ?? '',
  PROD_BASE_URL: process.env.PROD_BASE_URL ?? '',
};

export default config;
