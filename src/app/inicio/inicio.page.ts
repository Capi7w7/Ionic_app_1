import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { chatbubblesOutline, heartOutline, logOutOutline, mailOutline, notificationsOutline, personOutline } from 'ionicons/icons'
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../auth.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports:[IonicModule,CommonModule,RouterLink]
})


export class InicioPage implements OnInit {

  options:any[] = [];

  userId!: string;
  userData: any;
  nombreUsuario: string = '';
  urlperfil: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiserviceService,
    private modalController: ModalController,
    private authService: AuthServiceService,
    private router: Router,
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
    console.log(this.options);
    this.options = [
      {title: 'Perfil', icon: 'person-outline', color: 'primary'},
      {title: 'Comunidad', icon: 'chatbubbles-outline', color: 'primary'},
      {title: 'Amigos', icon: 'heart-outline', color: 'primary'},
      {title: 'Correo', icon: 'mail-outline', color: 'primary'},
      {title: 'Notificationes', icon: 'notifications-outline', color: 'primary'},
      {title: 'Salir', icon: 'log-out-outline', color: 'dark', background: 'primary'},
    ];

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


  async irAemprendimiento() {
    this.router.navigate(['/listar-emprendimiento']);
  }
  async irAcamara() {
    this.router.navigate(['/agregar',this.userId]);
  }

  async irAperfil( ) {
    this.router.navigate(['/eliminar',this.userId]);
  }

  async irActualizar() {
    this.router.navigate(['/actualizar',this.userId]);
  }

  loadUserData() {
    this.apiService.getPerfilbyID(this.userId).subscribe(
      async (data) => {
        this.userData = data;
        if (this.userData && this.userData[0]) {
          this.urlperfil = this.userData[0].id;
          this.nombreUsuario = this.userData[0].nombre;  // Asigna el nombre del usuario
          this.imgPerf = this.userData[0].img_perf;  // Asigna la URL de la imagen

          console.log('Nombre de usuario:', this.nombreUsuario);  // Verifica el nombre del usuario
          console.log('Imagen de perfil:', this.imgPerf);  // Verifica la URL de la imagen
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

  getRows() {
    const rows = [];
    for (let i= 0; i < this.options.length; i += 3) {
      rows.push(this.options.slice(i, i + 3));
    }
    return rows;
  }

  exit() {
    this.authService.logout();
  }

}