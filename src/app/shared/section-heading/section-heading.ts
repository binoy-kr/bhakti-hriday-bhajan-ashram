import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-section-heading',
  imports: [NgClass],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.scss'
})
export class SectionHeading {
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() description = '';
  @Input() align: 'left' | 'center' = 'left';
  @Input() tone: 'dark' | 'light' = 'dark';
  @Input() size: 'md' | 'lg' = 'lg';
}
