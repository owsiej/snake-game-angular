import { environment } from '../../environments/environment';

const apiUrl: string = environment.apiUrl;

const GlOBAL_PREFIX: string = '/api/v1';

export const Urls = {
  LOGIN: apiUrl + GlOBAL_PREFIX + '/auth/login',
  REGISTER: apiUrl + GlOBAL_PREFIX + '/auth/register',
  LOGOUT: apiUrl + GlOBAL_PREFIX + '/auth/logout',
  REFRESH_TOKEN: apiUrl + GlOBAL_PREFIX + '/auth/refresh-token',
  CHECK_USER: apiUrl + GlOBAL_PREFIX + '/users',
  GET_ALL_SCORES: apiUrl + GlOBAL_PREFIX + '/scores',
  GET_ALL_USER_SCORES: apiUrl + GlOBAL_PREFIX + '/scores',
  POST_SCORE: apiUrl + GlOBAL_PREFIX + '/scores',
};
