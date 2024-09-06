import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(public fb:FormBuilder, public alertController: AlertController) {
   this.formularioRegistro = this.fb.group({
    'nombre': new FormControl("",Validators.required),
    'password': new FormControl("",Validators.required),
    'confirmacionPassword': new  FormControl("",Validators.required)
   });
   }


  ngOnInit() {
  }

  async guardar() {
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header:'Datos incompletos',
        message: 'Favor llenar todos los campos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    var usuario = {
      nombre: f.nombre,
      password: f.password
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));
  }

}  
