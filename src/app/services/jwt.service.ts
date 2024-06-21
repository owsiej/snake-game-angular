import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  static isTokenValid(token: string): boolean {
    const decodedToken = jwtDecode(token);
    const expiryTime = decodedToken.exp!;

    return Math.floor(new Date().getTime() / 1000) < expiryTime;
  }
}
