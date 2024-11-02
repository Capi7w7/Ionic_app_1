import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {
  countdown: number = 10;  // Primer contador
  countdownSecond: number = 5;  // Segundo contador
  showExplosion: boolean = false;
  mikeImage: string = '/assets/images/mik.png';  // Imagen inicial de Mike

  ngOnInit() {
    this.startCountdown();  // Inicia el primer contador
  }

  startCountdown() {
    const interval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(interval);
        this.triggerExplosion();
        this.startSecondCountdown();  // Inicia el segundo contador cuando el primero llegue a 0
      }
    }, 1000);  // Disminuye cada segundo
  }

  startSecondCountdown() {
    const secondInterval = setInterval(() => {
      this.countdownSecond--;

      if (this.countdownSecond === 0) {
        clearInterval(secondInterval);
        this.redirectToLogin();
      }
    }, 1000);  // Disminuye cada segundo
  }

  triggerExplosion() {
    // Activa la clase de explosión y cambia la imagen después de un corto retraso
    this.showExplosion = true;

    setTimeout(() => {
      this.mikeImage = '/assets/images/mike.png';  // Cambia a la nueva imagen
      this.showExplosion = false;
    }, 500);  // Explosión dura 0.5 segundos
  }

  redirectToLogin() {
    // Lógica para redirigir al usuario a la página de login
    window.location.href = '/login';
  }
}
