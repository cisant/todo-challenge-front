import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  private socket = io(environment.baseurl);
  constructor() {}

  getSocketId(): string {
    if (!this.socket) {
      return null;
    }
    return this.socket.id;
  }

  onUpdateTodoList(callback: (...args: any[]) => void): void {
    if (!this.socket) {
      return;
    }
    this.socket.on('UPDATE_TODO_LIST', callback);
  }
}
