import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-skeleton',
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent {

  theme = {
    background: '#0C599F',
    height: '16pt',
    width: '16pt',
  }
}
