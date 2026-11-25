import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-strip',
  imports: [RouterLink],
  templateUrl: './cta-strip.html',
  styleUrl: './cta-strip.scss'
})
export class CtaStrip {
  @Input() eyebrow = 'An invitation';
  @Input() title = 'Come closer to the divine.';
  @Input() description = '';
  @Input() primaryLabel = 'Explore the Ashram';
  @Input() primaryLink = '/about';
  @Input() secondaryLabel = '';
  @Input() secondaryLink = '';
}
