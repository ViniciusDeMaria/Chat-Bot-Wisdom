import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastsContainerComponent } from "./view/toast/toasts-container.component";

@Component({
  selector: 'my-app',
  imports: [RouterOutlet, ToastsContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wisdom';
}
