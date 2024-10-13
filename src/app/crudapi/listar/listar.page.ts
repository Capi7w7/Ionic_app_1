import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/apiservice.service';
import { Iperfil } from 'src/app/interfaces/iperfil';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})

export class ListarPage {

  perfil = {
    id: 2,
    nombre: "Nayareth",
    apellido: "Suarez",
    apodo: "Nay",
    mail: "na.suarez@duocuc.cl",
    img_perf: "https://th.bing.com/th/id/OIP.A9NoL9YD_Eolof8BwvVbWgHaG1?rs=1&pid=ImgDetMain",
    edad: 21,
  }

  constructor(private apiService: ApiserviceService, private router:Router, private loadingCtrl: LoadingController) { }

  getPerfilbyID(perfilid: number) {
    this.apiService.getPerfilbyID(perfilid).subscribe(
      (response: any) => {
        this.perfil = {
          id: response[0].id,
          nombre: response[0].nombre,
          apellido: response[0].apellido,
          apodo: response[0].apodo,
          mail: response[0].mail,
          img_perf: response[0].img_perf,
          edad: response[0].edad,
          }
        }
    )
  }
}
