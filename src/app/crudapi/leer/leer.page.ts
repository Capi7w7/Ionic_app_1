import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/apiservice.service';
import { Iperfil } from 'src/app/interfaces/iperfil';

@Component({
  selector: 'app-leer',
  templateUrl: './leer.page.html',
  styleUrls: ['./leer.page.scss'],
})


  export class LeerPage  {

    perfiles: Iperfil[] = [];
  
    constructor(private perfilesServ:ApiserviceService, private loadingCtrl:LoadingController ) { }
  
    ionViewWillEnter(){
      this.cargarPerfiles()
    }
  
    async cargarPerfiles(event?: InfiniteScrollCustomEvent){
      const loading = await this.loadingCtrl.create({
        message: "Cargando...",
        spinner: "bubbles"
      }
    );
  
    await loading.present();
    
    this.perfilesServ.listarPerfil().subscribe(
      (resp) => {
        loading.dismiss();
        let listString = JSON.stringify(resp)
        this.perfiles = JSON.parse(listString)
        event?.target.complete()
      },
      (err) => {
        console.log(err.message)
        loading.dismiss();
      }
    )
    }
  }

