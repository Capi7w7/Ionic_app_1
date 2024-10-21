import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthServiceService } from '../auth.service.service';
import { ApiserviceService } from '../apiservice.service'; 
import { IperfilId } from '../interfaces/iperfil-id';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { BaseService } from '../Sqlite/base.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    public authService: AuthServiceService,
    private apiService: ApiserviceService,
    private loadingCtrl:LoadingController,
    private dbService: BaseService,
  ) 
  {
   this.formularioRegistro = this.fb.group({
    'nombre': new FormControl("",Validators.required),
    'apellido': new FormControl("",Validators.required),
    'apodo': new FormControl("",Validators.required),
    'email': new FormControl("",[Validators.required,Validators.email]),
    'password': new FormControl("",[Validators.required,Validators.pattern(/^(?=(?:.*\d){4})(?=(?:.*[a-zA-Z]){3})(?=(?:.*[A-Z]){1})(?!.*\s).{8,}$/)]),
    'confirmacionPassword': new  FormControl("",[Validators.required]),
    'birthdate': new FormControl('', Validators.required) 
   }, { validators: authService.passwordMatchValidator });
   }

  private calculateAge(birthdate: string): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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
      var usuario: any = {
        mail: f.email,
        pass: f.password,
        nombre: f.nombre,
        apellido: f.apellido || ""
      }

    if (f.apodo) usuario.apodo = f.apodo;
    if (f.birthdate) usuario.edad = this.calculateAge(f.birthdate);
    if (f.img_perf) usuario.img_perf = f.img_perf;

    

      try {
        await this.dbService.createUser(usuario);
        console.log("Datos guardados en la base de datos");
      } catch ( error) {
        console.error("Error al guardar los datos en la base de datos", error);
      }

      this.apiService.crearPerfil(usuario).subscribe(
        async (response) => {
          const alert = await this.alertController.create({
            header: 'Ingresado correctamente',
            message: 'Se ha registrado Exitosamente',
            buttons: ['Aceptar']
          });
          await alert.present();
          console.log("Usuario registrado", response);
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un problema al registrar el usuario',
            buttons: ['Aceptar']
          });
          await alert.present();
          console.error("Error al registrar usuario", error);
        }
      );
    }
    }

    async cargarPerfiles(event?: InfiniteScrollCustomEvent){
      const loading = await this.loadingCtrl.create({
        message: "Cargando...",
        spinner: "bubbles"
      }
    ); 
  }}