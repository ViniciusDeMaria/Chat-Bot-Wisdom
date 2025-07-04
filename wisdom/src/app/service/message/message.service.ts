import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageRequest, MessageResponse } from "./message.type";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Guid } from "guid-typescript";
import { io, Socket } from 'socket.io-client';
import { environment } from "../../config";

@Injectable({ providedIn: 'root' })
export class MessageService {

  // private socket!: Socket;
  private messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);

  private guidHash = '';

  private socket = io(
  environment.API_BAKCEND, {
    reconnection: true, // Habilita reconexão automática
    reconnectionAttempts: 5, // Número de tentativas antes de desistir
    reconnectionDelay: 1000, // Intervalo entre tentativas
    timeout: 60000, // Timeout do ping
    transports: ['websocket'] // Força o uso de WebSocket
  });

  constructor(private _httpClient: HttpClient) {
    this.socket.on("connect", ()=> {
    });

    this.socket.on('receive-message', (message) => {
      this.setMessageBot(message.message, message?.loading, message?.welcome);
    });

    this.socket.on('loading-message', (message)=> {
      this.setMessageBot(message.text, message.loading);
    });

    this.socket.on('disconnect-message', (message)=> {
      this.setMessageBot(message.text, message.loading);
    });
  }

  sendMessage(message: any): Observable<any> {
    this.setMessageUser(message);
    if (this.guidHash == '') {
      this.createNewGuidHashConversation();
    }

    this.socket.emit('room-message', {conversationId: this.guidHash});

    return this._httpClient
      .post<any>(
         environment.API_BAKCEND + '/api/v1/gen-ai/message',
        {
          interaction: message,
          conversationId: this.guidHash,
        }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public getMessageWelcome() {
    if (!this.checkLocalStorageMessageWelcome()) {
      if (this.guidHash === '') {
            this.createNewGuidHashConversation();
      }
      this.socket.emit('welcome', { conversationId: this.guidHash });
    } else {
      const msgWelcome = localStorage.getItem("MSG_WELCOME")
      if (msgWelcome) {
        const msg = JSON.parse(msgWelcome);
        this.messageHistory.next(msg);
      }
    }
  }

  private setMessageUser(message: string) {
    this.messageHistory.next({
      from: 'user',
      message: message,

    });
  }

  private setMessageBot(message: string, loading: boolean = false, welcome: boolean = false) {
    this.messageHistory.next({
      from: 'bot',
      message: message,
      loading: loading,
      welcome: welcome,
    });
  }

  checkLocalStorageMessageWelcome() {
    const item = localStorage.getItem('MSG_WELCOME');
    return item != undefined || item != null;
  }

  // Método para escutar mensagens vindas do servidor
  public onMessage(callback: (data: any) => void): void {
    this.socket.on('reply', callback);
  }

  public getMessageHistory(): Observable<any> {
    return this.messageHistory.asObservable();
  }

  public cleanMessages() {
    this.messageHistory.next(null);
  }

  public createNewGuidHashConversation() {
    this.guidHash = Guid.create().toString();
  }
}
