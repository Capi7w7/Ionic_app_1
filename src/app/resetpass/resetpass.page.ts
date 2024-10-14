import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth.service.service';
import { AlertController, NavController } from '@ionic/angular'; 


@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {

  userId: string = '';
  username: string = '';  
  email: string = '';     
  newPassword: string = '';
  verificationCode: string = '';
  generatedCode: string = '';
  showVerification: boolean = false;

  constructor(public authService: AuthServiceService, public alertController: AlertController, public navCtrl: NavController) { }

  // Solicitar código de recuperación después de verificar nombre de usuario y correo
async requestReset() {
  this.authService.getUserByUsername(this.username, this.email).subscribe(
    user => {
      if (user) {
        this.userId = user.id;
        this.generatedCode = this.authService.generateVerificationCode();
        this.showVerification = true;
        console.log(`Se ha enviado un código de verificación a ${this.email}. Código simulado: ${this.generatedCode}`);
        console.log('Id a actualizar', this.userId);

        this.alertController.create({
          header: 'Verificación exitosa',
          message: 'Se ha enviado un código de verificación a su mail',
          buttons: ['Aceptar']
        }).then(alert => alert.present());
      } else {
        console.log('Nombre de usuario o correo electrónico incorrectos.');

        this.alertController.create({
          header: 'Verificación no exitosa',
          message: 'Nombre de usuario o correo electrónico incorrectos.',
          buttons: ['Aceptar']
        }).then(alert => alert.present());
      }
    }
  );
}
  // Restablecer la contraseña si el código de verificación es correcto
  resetPassword() {
    if (this.verificationCode === this.generatedCode && this.userId) {
      this.authService.updatePasswordByUsername(this.userId, this.newPassword).subscribe(
        success => {
          if (success) {
            console.log('Contraseña restablecida exitosamente.');
  
            this.alertController.create({
              header: 'Verificación exitosa',
              message: 'Contraseña restablecida exitosamente.',
              buttons: ['Aceptar']
            }).then(alert => alert.present());
          } else {
            console.log('Error al restablecer la contraseña.');
          }
        }
      );
    } else {
      console.log('Código de verificación incorrecto.');
  
      this.alertController.create({
        header: 'Verificación no exitosa',
        message: 'Código de verificación incorrecto.',
        buttons: ['Aceptar']
      }).then(alert => alert.present());
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {
  }

}
