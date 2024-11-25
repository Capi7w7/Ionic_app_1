import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { ApiserviceService } from './apiservice.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  

  constructor(private apiService: ApiserviceService) { }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmacionPassword');
  
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }


  getUserByUsername(username: string, email: string): Observable<any> {
    return this.apiService.listarPerfil().pipe(
      map((perfiles: any[]) => perfiles.find((user: any) => user.nombre === username && user.mail === email) || null)

    );
  }

  updatePasswordByUsername(id: string, newPassword: string): Observable<boolean> {
    return this.apiService.getPerfilbyID(id).pipe(
      switchMap((user: any) => {
        if (user) {
          return this.apiService.actualizarPassword(id, newPassword).pipe(
            map(() => true)
          );
        }
        return of(false);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('userId');
  }
  
  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();  // Código de 6 dígitos
  }

}
