import { HttpContextToken } from '@angular/common/http';

export const JWT_REQUIRED = new HttpContextToken<boolean>(() => false);
export const JWT_REFRESH_REQUIRED = new HttpContextToken<boolean>(() => false);
