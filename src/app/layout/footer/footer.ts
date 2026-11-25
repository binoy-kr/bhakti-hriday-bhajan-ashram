import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  readonly year = new Date().getFullYear();
  readonly subscribed = signal(false);
  readonly explore = ['/about', '/services', '/festivals', '/gallery', '/room-booking', '/donation', '/contact'];
  readonly labels: Record<string, string> = {
    '/about': 'About',
    '/services': 'Services',
    '/festivals': 'Festivals',
    '/gallery': 'Gallery',
    '/room-booking': 'Room Booking',
    '/donation': 'Donation',
    '/contact': 'Contact'
  };

  subscribe(): void {
    this.subscribed.set(true);
  }
}
