import { AfterViewInit, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { CtaStrip } from '../../../shared/cta-strip/cta-strip';
import { ImageFrame } from '../../../shared/image-frame/image-frame';
import { ImageLightbox } from '../../../dialogs/image-lightbox/image-lightbox';
import { Logo } from '../../../shared/logo/logo';
import { SectionHeading } from '../../../shared/section-heading/section-heading';
import { SiteContentService } from '../../../service/site-content.service';
import { MotionService } from '../../../service/motion.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Logo, SectionHeading, ImageFrame, CtaStrip, ImageLightbox],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('homeRoot') homeRoot?: ElementRef<HTMLElement>;
  @ViewChild('festivalSection') festivalSection?: ElementRef<HTMLElement>;
  @ViewChild('festivalTrack') festivalTrack?: ElementRef<HTMLElement>;

  readonly content = new SiteContentService();
  readonly headlineLines = ['Where the', 'heart learns', 'to sing'].map((line) => [...line]);
  readonly testimonialIndex = signal(0);
  readonly lightboxIndex = signal(-1);

  private context?: gsap.Context | null;
  private cleanupHorizontal?: () => void;
  private cleanupMagnetic?: () => void;

  constructor(private readonly motion: MotionService) {}

  ngAfterViewInit(): void {
    if (!this.homeRoot || this.motion.reducedMotion()) {
      return;
    }

    this.context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .from('.hero-logo', { y: -24, autoAlpha: 0, duration: 0.9 })
        .from('.hero-char', { yPercent: 120, autoAlpha: 0, duration: 1, stagger: 0.018, ease: 'power4.out' }, '-=0.45')
        .from('.hero-subtitle', { y: 24, autoAlpha: 0, duration: 0.85 }, '-=0.55')
        .from('.hero-actions > *', { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.12 }, '-=0.5')
        .from('.hero-portrait', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' }, '-=1.2')
        .from('.hero-scroll', { autoAlpha: 0, duration: 0.7 }, '-=0.6');

      this.motion.reveal(this.homeRoot!.nativeElement);
      this.motion.stagger(this.homeRoot!.nativeElement, '.service-card', this.homeRoot!.nativeElement.querySelector('.services-section'));
      this.motion.stagger(this.homeRoot!.nativeElement, '.gallery-item', this.homeRoot!.nativeElement.querySelector('.gallery-section'));
      this.motion.parallax(this.homeRoot!.nativeElement, '[data-parallax]', 70);

      this.homeRoot!.nativeElement.querySelectorAll<HTMLElement>('[data-count]').forEach((element) => {
        this.motion.countUp(element, Number(element.dataset['count']), element.dataset['suffix'] ?? '');
      });
    }, this.homeRoot.nativeElement);

    if (this.festivalSection && this.festivalTrack) {
      this.cleanupHorizontal = this.motion.horizontalGallery(
        this.festivalSection.nativeElement,
        this.festivalTrack.nativeElement
      );
    }
    this.cleanupMagnetic = this.motion.magneticButtons(this.homeRoot.nativeElement);
  }

  ngOnDestroy(): void {
    this.context?.revert();
    this.cleanupHorizontal?.();
    this.cleanupMagnetic?.();
  }

  nextTestimonial(): void {
    this.testimonialIndex.update((index) => (index + 1) % this.content.testimonials.length);
  }

  previousTestimonial(): void {
    this.testimonialIndex.update(
      (index) => (index - 1 + this.content.testimonials.length) % this.content.testimonials.length
    );
  }

  openImage(index: number): void {
    this.lightboxIndex.set(index);
  }

  closeImage(): void {
    this.lightboxIndex.set(-1);
  }

  statCount(value: string): string {
    return value.replace(/[^0-9]/g, '');
  }

  statSuffix(value: string): string {
    if (value.includes('+')) {
      return '+';
    }
    return value.includes('K') ? 'K' : '';
  }
}
