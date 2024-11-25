import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agregar-emprendimiento',
  templateUrl: './agregar-emprendimiento.page.html',
  styleUrls: ['./agregar-emprendimiento.page.scss'],
  standalone: true,
  imports:[IonicModule,CommonModule,RouterLink,ReactiveFormsModule]
})
export class AgregarEmprendimientoPage implements OnInit {

  emprendimientoForm: FormGroup
  userId!: string;

  constructor(private fb: FormBuilder,
              private apiService: ApiserviceService, 
              public reactiveFormsModule: ReactiveFormsModule,
              private route: ActivatedRoute,
            ) {
    this.emprendimientoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      descripcion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.userId = idParam; 
      } else {
        console.error('No ID provided');
      }
    });
  }

  submitForm() {
    if (this.emprendimientoForm.valid) {
      this.apiService.addEmprendimiento(this.emprendimientoForm.value).subscribe(
        (response) => {
          console.log('Emprendimiento agregado:', response);
        },
        (error) => {
          console.error('Error al agregar emprendimiento:', error);
        }
      );
    }
  }
}
