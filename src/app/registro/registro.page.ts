import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthServiceService } from '../auth.service.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(public fb:FormBuilder, public alertController: AlertController,
    public navCtrl: NavController, public authService: AuthServiceService ) 
  
  {
   this.formularioRegistro = this.fb.group({
    'nombre': new FormControl("",Validators.required),
    'email': new FormControl("",[Validators.required,Validators.email]),
    'password': new FormControl("",[Validators.required,Validators.pattern(/^(?=(?:.*\d){4})(?=(?:.*[a-zA-Z]){3})(?=(?:.*[A-Z]){1})(?!.*\s).{8,}$/)]),
    'confirmacionPassword': new  FormControl("",[Validators.required]),
    'birthdate': new FormControl('', Validators.required) 
   }, { validators: authService.passwordMatchValidator });
   }


  ngOnInit() {
  }

  async guardar() {
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
     
      if (this.formularioRegistro.hasError('passwordMismatch')) {
        const alert = await this.alertController.create({
          header: 'Error de Confirmación',
          message: 'Las contraseñas no coinciden.',
          buttons: ['Aceptar']
        });
        await alert.present();
      
      }

      else{
        const alert = await this.alertController.create({
          header:'Datos incompletos',
          message: 'Favor llenar todos los campos.',
          buttons: ['Aceptar']
        });
  
        await alert.present();
      }

    }

    if (this.formularioRegistro.valid) {
      const alert = await this.alertController.create({
        header: 'Ingresado correctamente',
        message: 'Se ha registrado Exitosamente',
        buttons: ['Aceptar']
      });

      await alert.present();
    
    /*if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header:'Datos incompletos',
        message: 'Favor llenar todos los campos.',
        buttons: ['Aceptar']
      });

      await alert.present();
    }

    if(this.formularioRegistro.valid){
      const alert = await this.alertController.create({
        header:'Ingresado correctamente',
        message: 'Bienvenido a comunidad Mi Plaza Norte',
        buttons: ['Aceptar']
      })

      await alert.present();
    }*/

    var usuario = {
      nombre: f.nombre,
      password: f.password,
      email: f.email
    }

    console.log("Usuario registrado")


    localStorage.setItem('usuario',JSON.stringify(usuario));
  }

}  
}