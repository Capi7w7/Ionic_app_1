import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/apiservice.service';
import { Iperfil } from 'src/app/interfaces/iperfil';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})

export class ListarPage implements OnInit{

 

  perfil: any;
  perfilid: string = '';

  constructor(private apiService: ApiserviceService, private router:Router, private loadingCtrl: LoadingController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.perfilid = this.route.snapshot.paramMap.get('id')!;

    this.apiService.listarPerfil().subscribe(
      (response) => {
        const perfiles = response;
        this.perfil = perfiles.find((p: any) => p.id === this.perfilid);
        }
    )
  }

}
