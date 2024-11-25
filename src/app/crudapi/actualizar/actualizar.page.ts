import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage {
  message: string = '';
  messages: { text: string; time: string }[] = [];
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // Escuchar los mensajes recibidos
    this.chatService.getMessages().subscribe((message) => {
      this.messages.push(message);  // Agregar mensaje al array
      this.scrollToBottom();
    });
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      const time = this.getCurrentTime();
      const message = { text: this.message, time: time };
      this.chatService.sendMessage(message);  // Enviar el mensaje con hora
      this.messages.push(message);  // Agregar el mensaje a la lista
      this.message = '';  // Limpiar el campo de entrada
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  // Función para obtener la hora actual
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}