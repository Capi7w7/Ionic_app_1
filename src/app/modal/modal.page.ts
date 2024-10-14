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

    this.router.navigate(['/login'])

  }

  public pefilPages = [
    { title: 'Ver perfil', url: '/listar/:id', icon: 'list' },
    { title: 'Ver perfiles', url: '/leer', icon: 'people' },
    { title: 'Editar perfil', url: '/actualizar', icon: 'create' },
    { title: 'Cerrar sesión', url: '/login', icon: 'log-out', handler: () => { this.cerarSesion(); } },
  ]

}


