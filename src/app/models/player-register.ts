export interface PlayerRegister {
  username: string;
  password: string;
  dateOfBirth: {
    year: number;
    month: string;
    day: number;
  };
}
