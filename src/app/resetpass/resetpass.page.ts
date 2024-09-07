import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth.service.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {

  username: string = '';  
  email: string = '';     
  newPassword: string = '';
  verificationCode: string = '';
  generatedCode: string = '';
  showVerification: boolean = false;

  constructor(private authService: AuthServiceService) { }

  // Solicitar código de recuperación después de verificar nombre de usuario y correo
  requestReset() {
    const user = this.authService.getUserByUsername(this.username);
    if (user) {
      // Simular el envío del código al correo electrónico
      this.generatedCode = this.authService.generateVerificationCode();
      this.showVerification = true;
      console.log(`Se ha enviado un código de verificación a ${this.email}. Código simulado: ${this.generatedCode}`);
    } else {
      console.log('Nombre de usuario o correo electrónico incorrectos.');
    }
  }

  // Restablecer la contraseña si el código de verificación es correcto
  resetPassword() {
    if (this.verificationCode === this.generatedCode) {
      const success = this.authService.updatePasswordByUsername(this.username, this.newPassword);
      if (success) {
        console.log('Contraseña restablecida exitosamente.');
        this.showVerification = false;
        this.username = '';
        this.email = '';
        this.newPassword = '';
        this.verificationCode = '';
      } else {
        console.log('Error al restablecer la contraseña.');
      }
    } else {
      console.log('Código de verificación incorrecto.');
    }
  }

  ngOnInit() {
  }

}
