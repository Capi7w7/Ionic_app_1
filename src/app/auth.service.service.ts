import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  getUserByUsername(username: string, email: string): any {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (user && user.nombre === username && user.email === email) {
      return user;
    }
    return null;
  }

  updatePasswordByUsername(username: string, newPassword: string): boolean {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (user && user.nombre === username) {
      user.password = newPassword;
      localStorage.setItem('usuario', JSON.stringify(user));
      return true;
    }
    return false;
  }

  
  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();  // Código de 6 dígitos
  }
}
