import axios from 'axios';
import config from '../config';
import { IDomain, IDomainError } from '../interfaces';

axios.defaults.baseURL = config.GODADDY_BASEURL;

axios.defaults.headers.common[
  'Authorization'
] = `sso-key ${config.GODADDY_API_KEY}:${config.GODADDY_API_SECRET}`;

interface ICheckDomainsAvailability {
  domains: string[];
}

export const checkDomainsAvailability = async (
  data: ICheckDomainsAvailability
): Promise<{ domains: IDomain[]; errors: IDomainError[] }> => {
  const response = await axios.post(
    '/v1/domains/available?checkType=FAST',
    data.domains
  );

  return response.data;
};
