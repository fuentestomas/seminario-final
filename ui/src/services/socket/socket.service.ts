// socket.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl);
  }

  joinRoom(roomName: string): void {
    this.socket.emit('join', roomName);
  }

  sendMessage(messageObj: any): void {
    this.socket.emit('message', messageObj);
  }

  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (data: any) => {
        observer.next(data.newMessage);
      });
    });
  }
}