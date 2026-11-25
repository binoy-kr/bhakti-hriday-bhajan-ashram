import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [RouterLink],
  templateUrl: './logo.html',
  styleUrl: './logo.scss'
})
export class Logo {
  @Input() variant: 'dark' | 'light' | 'compact' = 'dark';
  @Input() showText = true;
}
