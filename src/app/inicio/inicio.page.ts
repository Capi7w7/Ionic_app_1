import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  nombreUsuario: string = '';

  constructor() { }

  ngOnInit() {
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      const datosUsuario = JSON.parse(usuario);
      this.nombreUsuario = datosUsuario.nombre || 'Usuario';  // Fallback a "Usuario" si no hay nombre
    }
  }
   }


