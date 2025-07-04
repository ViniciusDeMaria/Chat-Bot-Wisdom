import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo, faInfoCircle, faMessage, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../service/auth-service.service';
import { AuthGuard } from '../../../service/auth-guard';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../config';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private auth: AuthService, private router: Router) {}
  @Output() cleanChatEmit = new EventEmitter();

  logoutIcon = faPowerOff
  messageIcon = faMessage;
  public activeId = 1;
  wisdomImg = 'wisdom_v3.png';
  open = false;
  iconInfo= faInfoCircle;
  pcfactorylManual = environment.API_MANUAL_PCFACTORY;
  chatbotManual = environment.API_MANUAL_CHATBOT;
  version = environment.VERSION;

  cleanHistory() {
    this.cleanChatEmit.emit(true);
  }

  logout() {
    //this.auth.logout();
    this.router.navigate(['/login']);
  }

  getOpen() {
    return this.open;
  }

  openVersion() {
    this.open = !this.open;
  }

  closeVersion() {
    this.open = false;
  }


}
