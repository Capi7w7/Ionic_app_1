import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
import { chatbubblesOutline, heartOutline, logOutOutline, mailOutline, notificationsOutline, personOutline } from 'ionicons/icons'
import { RouterLink } from '@angular/router';
import { AuthServiceService } from 'src/app/auth.service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})

export class ListarPage implements OnInit{

 
  options:any[] = [];

  userId!: string;
  userData: any;
  nombreUsuario: string = '';
  urlperfil: string = '';
  apellidoUsuario!: string;
  email: any;
  descripcion: string = '';
  fechaNacimiento: string = '';
  comuna: string = '';
  intereses: string = '';
  siguiendo: any;
  seguidores: any;
  publicaciones: any;
  telefono: any;
  carrera!: string;
  isInfoVisible: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiserviceService,
    private modalController: ModalController,
    private authService: AuthServiceService,
    private router: Router
  ) { 
    addIcons({
      personOutline,
      mailOutline,
      notificationsOutline,
      logOutOutline,
      chatbubblesOutline,
      heartOutline
    });
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.userId = idParam; 
        this.loadUserData();
      } else {
        console.error('No ID provided');
      }
    });
  }

  loadUserData() {
    this.apiService.getPerfilbyID(this.userId).subscribe(
        (data) => {
            this.userData = data;
            if (this.userData && this.userData[0]) {
              this.urlperfil = this.userData[0].id;
              this.nombreUsuario = this.userData[0].nombre;
              this.apellidoUsuario = this.userData[0].apellido;
              this.email = this.userData[0].mail;
              this.descripcion = this.userData[0].descripcion;
              this.fechaNacimiento = this.userData[0].fechaNacimiento;
              this.comuna = this.userData[0].comuna;
              this.intereses = this.userData[0].intereses;   
              this.siguiendo = this.userData[0].siguiendo;
              this.seguidores = this.userData[0].seguidores;
              this.publicaciones = this.userData[0].publicaciones;
              this.telefono = this.userData[0].telefono;
              this.carrera = this.userData[0].carrera;
              this.imgPerf = this.userData[0].img_perf;  // Asigna la URL de la imagen
                console.log('Imagen de perfil:', this.imgPerf);  // Verifica que se está asignando correctamente
            
              } else {
                console.error('No se encontró el usuario con ese ID');
            }
        },
        (error) => {
            console.error('Error fetching user data:', error);
        }
    );
}
imgPerf(arg0: string, imgPerf: any) {
  throw new Error('Method not implemented.');
}
async irAinicio(){
  this.router.navigate(['/inicio']);
}
}