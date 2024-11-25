import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: WebSocket;  // WebSocket nativo
  private messageSubject: Subject<{ text: string, time: string }> = new Subject();  // Cambiado para manejar objetos

  private readonly serverUrl = 'ws://localhost:3001';  // Asegúrate de que el servidor esté escuchando en este puerto

  constructor() {
    // Conectar al servidor de WebSocket cuando se inicializa el servicio
    this.socket = new WebSocket(this.serverUrl);

    // Establecer eventos para manejar los mensajes
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data); // Suponiendo que el mensaje es un JSON
      this.messageSubject.next(message);  // Emitir el mensaje recibido
    };

    this.socket.onopen = () => {
      console.log('Conectado al servidor WebSocket');
    };

    this.socket.onclose = () => {
      console.log('Desconectado del servidor WebSocket');
    };

    this.socket.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };
  }

  // Método para enviar un mensaje al servidor
  sendMessage(message: { text: string, time: string }): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));  // Convertir a JSON antes de enviar
      console.log('Mensaje enviado al servidor:', message);
    } else {
      console.error('WebSocket no está conectado.');
    }
  }

  // Obtener los mensajes emitidos a través del WebSocket
  getMessages() {
    return this.messageSubject.asObservable();
  }

  // Método para desconectar
  disconnect() {
    this.socket.close();  // Cierra la conexión WebSocket
    console.log('Desconectado del servidor WebSocket');
  }
}
