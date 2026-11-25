import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-page-hero',
  imports: [NgClass],
  templateUrl: './page-hero.html',
  styleUrl: './page-hero.scss'
})
export class PageHero {
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() description = '';
  @Input() image = '';
  @Input() tone: 'dark' | 'light' = 'dark';
  @Input() size: 'normal' | 'tall' = 'normal';
}
