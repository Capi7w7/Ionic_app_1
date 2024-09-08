import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth.service.service';
import { AlertController } from '@ionic/angular'; 

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

  constructor(private authService: AuthServiceService, public alertController: AlertController) { }

  // Solicitar código de recuperación después de verificar nombre de usuario y correo
   async requestReset() {
    const user = this.authService.getUserByUsername(this.username, this.email);
    if (user) {
      // Simular el envío del código al correo electrónico
      this.generatedCode = this.authService.generateVerificationCode();
      this.showVerification = true;
      console.log(`Se ha enviado un código de verificación a ${this.email}. Código simulado: ${this.generatedCode}`);

      const alert = await this.alertController.create({
        header:'Vereficacion exitosa',
        message: 'Se ha enviado un código de verificación a su mail',
        buttons: ['Aceptar']
      });

      await alert.present();
      
    } else {
      console.log('Nombre de usuario o correo electrónico incorrectos.');

      const alert = await this.alertController.create({
        header:'Vereficacion no exitosa',
        message: 'Nombre de usuario o correo electrónico incorrectos.',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }

  // Restablecer la contraseña si el código de verificación es correcto
  async resetPassword() {
    if (this.verificationCode === this.generatedCode) {
      const success = this.authService.updatePasswordByUsername(this.username, this.newPassword);
      if (success) {
        console.log('Contraseña restablecida exitosamente.');
        this.showVerification = false;
        this.username = '';
        this.email = '';
        this.newPassword = '';
        this.verificationCode = '';

        const alert = await this.alertController.create({
          header:'Vereficacion exitosa',
          message: 'Contraseña restablecida exitosamente.',
          buttons: ['Aceptar']
        });
  
        await alert.present();

      } else {
        console.log('Error al restablecer la contraseña.');
      }
    } else {
      console.log('Código de verificación incorrecto.');

      const alert = await this.alertController.create({
        header:'Vereficacion no exitosa',
        message: 'Código de verificación incorrecto.',
        buttons: ['Aceptar']
      });

      await alert.present();

      
    }
  }

  ngOnInit() {
  }

}
