import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  private socket = io(environment.baseurl);
  constructor() {}

  onUpdateTodoList(callback: (...args: any[]) => void) {
    this.socket.on('UPDATE_TODO_LIST', callback);
  }
}
