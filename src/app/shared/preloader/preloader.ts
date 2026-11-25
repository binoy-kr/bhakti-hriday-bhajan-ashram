import { AfterViewInit, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { Logo } from '../logo/logo';
import { MotionService } from '../../service/motion.service';

@Component({
  selector: 'app-preloader',
  imports: [Logo],
  templateUrl: './preloader.html',
  styleUrl: './preloader.scss'
})
export class Preloader implements AfterViewInit, OnDestroy {
  @ViewChild('overlay') overlay?: ElementRef<HTMLElement>;

  readonly done = signal(false);
  private context?: gsap.Context | null;

  constructor(private readonly motion: MotionService) {}

  ngAfterViewInit(): void {
    if (this.motion.reducedMotion() || !this.overlay) {
      this.done.set(true);
      return;
    }

    this.context = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => {
          this.done.set(true);
          this.motion.refresh();
        }
      });

      timeline
        .from('.preloader-mark', { scale: 0.72, autoAlpha: 0, duration: 0.7, ease: 'back.out(1.6)' })
        .from('.preloader-line span', { scaleX: 0, duration: 0.8, stagger: 0.08, ease: 'power3.inOut' }, '-=0.2')
        .from('.preloader-text', { y: 14, autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, '-=0.45')
        .to('.preloader-mark', { y: -10, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, '+=0.25')
        .to('.preloader-line span', { scaleX: 0, transformOrigin: 'right center', duration: 0.4, stagger: 0.05 }, '-=0.35')
        .to(this.overlay!.nativeElement, { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.2');
    }, this.overlay.nativeElement);
  }

  ngOnDestroy(): void {
    this.context?.revert();
  }
}
