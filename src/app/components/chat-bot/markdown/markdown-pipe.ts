import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { marked } from "marked";

@Pipe({
  name:'markdown'
})
export class MarkDownPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(value: any):SafeHtml {
      const html: any = marked(value || '');
      return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
