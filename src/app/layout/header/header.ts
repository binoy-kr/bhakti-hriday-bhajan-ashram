import { Component, HostListener, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink, RouterLinkActive, Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  readonly links = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Festivals', path: '/festivals' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Stay', path: '/room-booking' },
    { label: 'Donate', path: '/donation' },
    { label: 'Contact', path: '/contact' }
  ];

  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.menuOpen.set(false);
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
