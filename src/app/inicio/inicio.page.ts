import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})



export class InicioPage implements OnInit {
  nombreUsuario: string = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      const datosUsuario = JSON.parse(usuario);
      this.nombreUsuario = datosUsuario.nombre || 'Usuario';  // Fallback a "Usuario" si no hay nombre
      }
    }

    async abrirModal() {
      const modal = await this.modalController.create({
        component: ModalPage,
        cssClass: 'custom-modal',
        componentProps: { 
          nombreUsuario: this.nombreUsuario,
        }
      });
  
      return await modal.present();
    }

  }


