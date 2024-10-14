import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})



export class InicioPage implements OnInit {
  userId!: string;
  userData: any;
  nombreUsuario: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiserviceService,
    private modalController: ModalController
  ) { }

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


  async abrirModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'custom-modal',
    });

    return await modal.present();
  }

  loadUserData() {
    this.apiService.getPerfilbyID(this.userId).subscribe(
      async (data) => {
        this.userData = data;
        console.log('User data:', this.userData[0]);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

}
