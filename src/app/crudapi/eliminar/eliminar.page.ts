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
import { EditUserModalComponent } from 'src/app/editarperfil/editarperfil.component'



@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
  imports: [IonicModule,CommonModule,RouterLink,FormsModule],
  standalone: true,
})
export class EliminarPage implements OnInit {

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
  apodo: any;
  carrera!: string;
  isInfoVisible: boolean | undefined;

  constructor(
    private modalCtrl: ModalController,
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

async openEditModal() {
  const modal = await this.modalCtrl.create({
    component: EditUserModalComponent,
    cssClass: 'cutom-modal',
    componentProps: { nombre: this.nombreUsuario,
      apellido: this.apellidoUsuario,
      apodo: this.apodo,
      mail: this.email,
      telefono: this.telefono,
      carrera: this.carrera,
      userId: this.userId },
  });

  modal.onDidDismiss().then((result) => {
    if (result.data) {
      this.apiService.actualizarPerfil(this.userId, result.data).subscribe(
        () => {
          this.loadUserData();
        }
      );
    }
  });

  await modal.present();
}

exit() {
  this.authService.logout();
}

irAInicio() {
  this.router.navigate(['/inicio', this.userId]); // Redirige a la ruta /inicio con el ID de usuario
}

irAleer(){
  this.router.navigate(['/leer', this.userId]);
}

// Método para redirigir a editar perfil
editarPerfil() {
  this.router.navigate(['/editar-perfil']);
}

// Método para ver amigos
verAmigos() {
  this.router.navigate(['/leer']);
}

async irAcamara() {
  this.router.navigate(['/agregar',this.userId]);
}


editarBio() {
  this.router.navigate(['/editar-bio']);
}

toggleInfo() {
  this.isInfoVisible = !this.isInfoVisible; // Alterna la visibilidad
}
eliminarPerfil() {
  if (this.userData && this.userData[0]) {
    const userId = this.userData[0].id;
    this.apiService.deleteData(userId).subscribe(() => {
      console.log('Usuario eliminado exitosamente');
      this.router.navigate(['/login']);
    });
  }}
}