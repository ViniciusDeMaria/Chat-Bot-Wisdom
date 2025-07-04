import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FormsModule }  from '@angular/forms';
import { MessageService } from '../../service/message/message.service';

@Component({
  selector: 'app-chat-bot',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent implements OnChanges {
  faCoffeeIcon = faPaperPlane ;
  placeholder = 'Digite sua mensagem ...';

  prompt: string = '';

  @Input() loading: boolean = false;
  @Output() updateLoadingEmit = new EventEmitter();

  constructor (private _message: MessageService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['loading'].currentValue) {
      this.loading = changes['loading'].currentValue;
    }
  }

  sendQuestion() {
    if (this.prompt && !this.loading) {
      this.updateLoadingEmit.emit();
      const data = this.prompt;
      this.prompt = '';
      this._message.sendMessage(data);
    }
  }
}
