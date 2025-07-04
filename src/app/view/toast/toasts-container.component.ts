import { Component, HostBinding, TemplateRef } from '@angular/core';
import { Toast, ToastService } from '../../service/toast/toast.service';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.scss'],
  imports: [CommonModule, NgbToastModule]
})
export class ToastsContainerComponent {
  @HostBinding('class.ngb-toasts')
  ngbToasts = 'true';

  constructor(public toastService: ToastService) {}

  isTemplate(toast: Toast): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }

  getTemplate(toast: Toast): TemplateRef<never> | null {
    if (this.isTemplate(toast)) {
      return toast.textOrTpl as TemplateRef<never>;
    }
    return null;
  }

  //Método para quebra dos testos no toast.
  getTextBreakLine(toast: Toast): any {
    if (!toast.isRender) {
      if (typeof toast.textOrTpl == 'string') {
        if (toast.textOrTpl.includes('<BREAK>')) {
          toast.isRender = true;
          const list = toast.textOrTpl.split('<BREAK>');
          //Busco pela classe
          const spanbreak = document.getElementsByClassName('span-break');

          list.forEach((element: string) => {
            if (element != '') {
              const span = document.createElement('span');
              const br = document.createElement('br');
              span.innerHTML = element;
              //Insiro no último elemento criado.
              spanbreak[spanbreak.length - 1]?.appendChild(span);
              spanbreak[spanbreak.length - 1]?.appendChild(br);
            }
          });
        }
      }
      return toast.textOrTpl;
    }
  }
}
