import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/apiservice.service';
import { Iperfil } from 'src/app/interfaces/iperfil';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leer',
  templateUrl: './leer.page.html',
  styleUrls: ['./leer.page.scss'],
})


  export class LeerPage  {

    perfiles: Iperfil[] = [];
    perfil: Iperfil | undefined;
    perfilid: string | null = null;
    userId2: any;

    constructor(private perfilesServ:ApiserviceService,private loadingCtrl:LoadingController,private activatedRoute:ActivatedRoute,private router:Router) { }
  
    ngOnInit() {
      this.perfilid = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.perfilid) {
      this.obtenerPerfil();

    }
    }
    ionViewWillEnter(){

      this.activatedRoute.paramMap.subscribe(params => {
        const idParam = params.get('id');
        if (idParam) {
          this.userId2 = idParam;
        } else {
          console.error('No ID provided');
        }
      });
  

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

    async irAinicio(){
      this.router.navigate(['/eliminar',this.userId2]);
    }
    obtenerPerfil() {
      this.perfilesServ.listarPerfil().subscribe((perfiles: Iperfil[]) => {
        // Buscar el perfil correspondiente en el array de perfiles
        this.perfil = perfiles.find((p: Iperfil) => p.id === this.perfilid);
      });
    }

   

  }
  

