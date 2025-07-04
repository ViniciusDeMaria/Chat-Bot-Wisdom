import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { faCopy, faRobot, faThumbsDown, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ToastService } from '../../service/toast/toast.service';
import { MessageService } from '../../service/message/message.service';
import { MarkDownPipe } from '../chat-bot/markdown/markdown-pipe';
import { SkeletonComponent } from "../skeleton/skeleton.component";
@Component({
  selector: 'app-chat-history',
  imports: [CommonModule, FontAwesomeModule, ClipboardModule, MarkDownPipe, SkeletonComponent],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss'
})
export class ChatHistoryComponent implements OnChanges, OnDestroy {
  chatHistory: any[] = [];


  @Input() cleanChat = false;
  @Output() cleanChatEmit = new EventEmitter();
  @Output() updateLoadingEmit = new EventEmitter();

  faRobot=faRobot;
  faUser=faUser;
  faCopie=faCopy;
  faLike=faThumbsUp;
  faDeslike=faThumbsDown;

  wisdomImg = 'wisdom_v3.png';

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor (private messageService: MessageService,
    private _toast: ToastService,
  ) {

    this.messageService.getMessageHistory().subscribe((response)=> {
      if (response) {

        if (response.loading || response.from === 'user' || response.welcome) {
          if (response.welcome) {
            localStorage.setItem('MSG_WELCOME', JSON.stringify(response));
          } else {
            this.updateLoadingEmit.emit();
          }
          this.chatHistory.push(response);

        } else {
          this.updateLoadingEmit.emit();
          this.chatHistory = this.chatHistory.map((chat)=> {
            if(chat.loading) {
              return response;
            } else {
              return chat;
            }
          });
        }
        this.scrollToBottom();
      }
    });

    this.messageService.getMessageWelcome();
  }

  ngOnDestroy() {
    this.chatHistory = [];
    this.messageService.cleanMessages();
    this.cleanChatEmit.emit(false);
  }

  ngOnChanges($event: SimpleChanges) {
    if ($event && $event['cleanChat'].currentValue == true) {
      this.updateClean();
    }
  }

  updateClean() {
    this.chatHistory = [];
    this.messageService.cleanMessages();
    this.messageService.createNewGuidHashConversation();
    this.messageService.getMessageWelcome();
    this.cleanChatEmit.emit(false);
  }

  copyText() {
    this._toast.show('Texto copiado com sucesso!!!', { type: 'success' });
  }

  scrollToBottom() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

}
