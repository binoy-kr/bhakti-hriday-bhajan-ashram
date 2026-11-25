import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-image-frame',
  imports: [NgClass],
  templateUrl: './image-frame.html',
  styleUrl: './image-frame.scss'
})
export class ImageFrame {
  @Input() src = '';
  @Input() alt = '';
  @Input() caption = '';
  @Input() ratio: 'portrait' | 'landscape' | 'square' = 'portrait';
}
