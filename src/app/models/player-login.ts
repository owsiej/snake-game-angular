import { PlayerRegister } from './player-register';

export type PlayerLogin = Omit<PlayerRegister, 'dateOfBirth'>;
