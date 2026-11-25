import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { MotionService } from '../../service/motion.service';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss'
})
export class UserLayout {
  private readonly motion = inject(MotionService);
  readonly showTop = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.showTop.set(window.scrollY > 600);
  }

  toTop(): void {
    window.scrollTo({
      top: 0,
      behavior: this.motion.reducedMotion() ? 'auto' : 'smooth'
    });
  }
}
