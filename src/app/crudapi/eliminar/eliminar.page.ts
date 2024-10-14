import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {

  options:any[] = [];
  userId!: string;
  userData: any;
  nombreUsuario: string = '';
  urlperfil: string = '';
  apiService: any;

  constructor() { }

  ngOnInit() {
  }



  loadUserData() {
    this.apiService.getPerfilbyID(this.userId).subscribe(
      async (data: any) => {  // Añadir tipo explícito 'any' a 'data'
        this.userData = data;
        if (this.userData && this.userData[0]) {
          this.nombreUsuario = this.userData[0].nombre;
          this.imgPerf = this.userData[0].img_perf;
          console.log('Nombre de usuario:', this.nombreUsuario);
          console.log('Imagen de perfil:', this.imgPerf);
        } else {
          console.error('No se encontró el usuario con ese ID');
        }
      },
      (error: any) => {  // Añadir tipo explícito 'any' a 'error'
        console.error('Error fetching user data:', error);
      }
    );
  }
  
  setUserId(userId: any) {
    throw new Error('Method not implemented.');
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
}
