import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private modalController: ModalController, private router: Router) { }

  ngOnInit() {}

  // Función para cerrar el modal
  cerrarModal() {
    this.modalController.dismiss();
  }

  cerarSesion() {
    localStorage.removeItem('usuario');
    
    this.modalController.dismiss();

    this.router.navigate(['/login'])

  }

}