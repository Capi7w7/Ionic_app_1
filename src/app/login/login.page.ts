import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, NavController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('3s')
      ]),
    ])
  ]
})
export class LoginPage implements OnInit {

  

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private apiService: ApiserviceService, private loadingCtrl: LoadingController,
    private router: Router) {

      


    this.formularioLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });

  }

  animationState = 'active';
  forgotPasswordVisible = false;

  userId: string = '';

  toggleAnimation() {
    this.animationState = this.animationState === 'active' ? 'inactive' : 'active';
  }

  showForgotPassword() {
    this.forgotPasswordVisible = true;
  }

  async OlvidoContrasena() {
    this.navCtrl.navigateRoot('resetpass');
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.ingresar()
  }

  
  async ingresar() {
    
    var f = this.formularioLogin.value;


    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Formulario inválido',
        message: 'Por favor, complete todos los campos correctamente.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
     }
    

    if (f.email && f.password) {
      const loading = await this.loadingCtrl.create({
        message: "Iniciando sesión...",
        spinner: "bubbles"
      });
      await loading.present();

    this.apiService.login(f.email, f.password).subscribe(
      async (response) => {
        await loading.dismiss();
        if (response && response.length > 0) {
          const user = response[0];
          this.userId = user.id;
          localStorage.setItem('userId', this.userId);
          console.log("Usuario logueado");
          this.router.navigate(['/inicio',this.userId]);
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Usuario o contraseña incorrectos',
            buttons: ['Aceptar']
          });
          await alert.present();
        }
      },
      async (error) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un problema al iniciar sesión',
          buttons: ['Aceptar']
        });
        await alert.present();
        console.error("Error al iniciar sesión", error);
      }
    );
  } else {
    const alert = await this.alertController.create({
      header: 'Datos incompletos',
      message: 'Por favor, ingrese email y contraseña.',
      buttons: ['Aceptar']
    });
    await alert.present();

    
    }
  }
}