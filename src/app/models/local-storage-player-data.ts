import { JwtTokens } from './jwt-tokens';

export interface LocalStoragePlayer {
  username: string;
  tokens?: JwtTokens;
}
