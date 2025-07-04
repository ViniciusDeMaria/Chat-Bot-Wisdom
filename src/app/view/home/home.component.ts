import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ChatBotComponent } from '../../components/chat-bot/chat-bot.component';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { ChatHistoryComponent } from '../../components/chat-history/chat-history.component';

@Component({
  selector: 'app-home',
  imports: [ HeaderComponent, CommonModule, ChatBotComponent, ChatHistoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cleanChat = false;

  loading: boolean = false;

  cleanHistory() {
    this.cleanChat = true;
  }

  updateCleanHistory() {
    this.cleanChat = false;
  }

  updateLoading() {
    this.loading = !this.loading;
  }
}
