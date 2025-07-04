import { Injectable, TemplateRef } from '@angular/core';

type ToastType = {
  type?: 'error' | 'success' | 'warning';
  isRender?: boolean;
};

export type Toast = {
  textOrTpl: string | TemplateRef<never>;
  className?: string;
} & any &
  ToastType;

@Injectable({ providedIn: 'root' })
export class ToastService {
  public toasts: Toast[] = [];

  show(
    textOrTpl: string | TemplateRef<never>,
    options: & any & ToastType = {}
  ) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
