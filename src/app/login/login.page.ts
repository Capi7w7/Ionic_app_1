import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {


    this.formularioLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });

  }

  async ingresar() {
    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Formulario inválido',
        message: 'Por favor, complete todos los campos correctamente.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
     }
    
    var f = this.formularioLogin.value;

    var usuarioString = localStorage.getItem('usuario');
    
    var usuario = usuarioString ? JSON.parse(usuarioString) : null;

    // Si 'usuario' es un objeto válido, comparamos las credenciales
    if (usuario && usuario.email === f.email && usuario.password === f.password) {
      console.log('Ingresado correctamente');

      localStorage.setItem(
        'ingresado',
        'true'
      );

      this.navCtrl.navigateRoot('inicio');

    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos ingresados son incorrectos.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  async OlvidoContrasena() {
    this.navCtrl.navigateRoot('resetpass');
  }

  ngOnInit() {}
}
