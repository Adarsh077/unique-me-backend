export interface ISocialMediaAvailabilityArgs {
  username: string;
}

export interface ISocialMediaAvailabilityReturn {
  available?: boolean;
  url?: string | null;
  error?: boolean;
}

export interface IDomain {
  available: boolean;
  domain: string;
  currency?: string;
  price?: number;
  period?: number;
}

export interface IDomainError {
  code: string;
  domain: string;
  message?: string;
  status?: number;
  path?: string;
}

export { default as ITodo } from './todo.interface';
export { default as IConfig } from './config.interface';
