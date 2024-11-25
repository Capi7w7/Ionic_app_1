import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.scss'],
  standalone: true,
  imports:[IonicModule,CommonModule,RouterLink,ReactiveFormsModule]
})
export class EditUserModalComponent {
  @Input() userData: any; // Datos iniciales del usuario
  @Input() userId!: string;

  userForm: FormGroup;
  

  constructor(private fb: FormBuilder, private modalCtrl: ModalController, private apiService: ApiserviceService, private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      fnombre: ['', [Validators.required, Validators.minLength(2)]],
      fapellido: ['', [Validators.required, Validators.minLength(2)]],
      fapodo: ['', [Validators.required, Validators.minLength(2)]],
      ftelefono: ['', [ Validators.minLength(9)]],
      fcarrera: ['', [ Validators.minLength(2)]],
      femail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    // Rellenar el formulario con datos iniciales
    this.userForm.patchValue({
      nombre: this.userData?.nombre,
      apellido: this.userData?.apellido,
      apodo: this.userData?.apodo,
      telefono: this.userData?.telefono,
      carrera: this.userData?.carrera,
      mail: this.userData?.mail,
      userId: this.userData?.userId
    });
  }

  

  async save() {

    var f = this.userForm.value;


    var usuario: any = {
        mail: f.femail,
        nombre: f.fnombre,
        apellido: f.fapellido,
        apodo: f.fapodo,
        telefono: f.ftelefono,
        carrera: f.fcarrera,
      }


    if (this.userForm.valid) {
      this.apiService.actualizarPerfil(this.userId, usuario)
        .subscribe({
          next: (updatedUser) => {
            this.modalCtrl.dismiss(updatedUser);
          },
          error: (error) => {
            console.log('Error updating profile:', error);
          }
        });
    } else {
      console.log('Formulario inválido');
    }
  }

  cancel() {
    this.modalCtrl.dismiss(null); // Cierra el modal sin cambios
  }
}
