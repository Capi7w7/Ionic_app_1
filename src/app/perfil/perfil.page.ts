import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chatbubblesOutline, heartOutline, logOutOutline, mailOutline, notificationsOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PerfilPage implements OnInit {

  options:any[] = []; 

  constructor() { 
    addIcons({
      personOutline,
      mailOutline,
      notificationsOutline,
      logOutOutline,
      chatbubblesOutline,
      heartOutline
    });
  }

  ngOnInit() {
    console.log('profile ngoninit');
    this.options = [
      {title: 'Perfil', icon: 'person-outline', color: 'primary'},
      {title: 'Comunidad', icon: 'chatbubbles-outline', color: 'primary'},
      {title: 'Amigos', icon: 'heart-outline', color: 'primary'},
      {title: 'Correo', icon: 'mail-outline', color: 'primary'},
      {title: 'Notificationes', icon: 'notifications-outline', color: 'primary'},
      {title: '', icon: 'log-out-outline', color: 'dark', background: 'primary'},
    ];
  }

  getRows() {
    const rows = [];
    for (let i= 0; i < this.options.length; i += 3) {
      rows.push(this.options.slice(i, i + 3));
    }
    return rows;
  }

}
