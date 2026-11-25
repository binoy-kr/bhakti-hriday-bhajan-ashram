import { Injectable, OnDestroy, signal } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({ providedIn: 'root' })
export class MotionService implements OnDestroy {
  private readonly mediaQuery =
    typeof window === 'undefined' ? null : window.matchMedia('(prefers-reduced-motion: reduce)');
  private readonly onPreferenceChange = (event: MediaQueryListEvent) => {
    this.reducedMotion.set(event.matches);
  };

  readonly reducedMotion = signal(this.mediaQuery?.matches ?? false);

  constructor() {
    this.mediaQuery?.addEventListener('change', this.onPreferenceChange);
  }

  ngOnDestroy(): void {
    this.mediaQuery?.removeEventListener('change', this.onPreferenceChange);
  }

  create(scope: Element, setup: () => void): gsap.Context | null {
    if (this.reducedMotion()) {
      return null;
    }
    return gsap.context(setup, scope);
  }

  reveal(scope: Element, selector = '[data-reveal]'): void {
    if (this.reducedMotion()) {
      return;
    }

    gsap.utils.toArray<HTMLElement>(selector, scope).forEach((element) => {
      gsap.from(element, {
        y: 44,
        autoAlpha: 0,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true
        }
      });
    });
  }

  stagger(scope: Element, selector: string, trigger?: Element | null): void {
    if (this.reducedMotion()) {
      return;
    }

    const items = gsap.utils.toArray<HTMLElement>(selector, scope);
    if (!items.length) {
      return;
    }

    gsap.from(items, {
      y: 56,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger ?? scope,
        start: 'top 78%',
        once: true
      }
    });
  }

  pageEnter(scope: Element): void {
    if (this.reducedMotion()) {
      return;
    }

    gsap.from(scope, {
      autoAlpha: 0,
      y: 18,
      duration: 0.75,
      ease: 'power2.out'
    });
  }

  parallax(scope: Element, selector = '[data-parallax]', distance = 80): void {
    if (this.reducedMotion()) {
      return;
    }

    gsap.utils.toArray<HTMLElement>(selector, scope).forEach((element) => {
      gsap.fromTo(
        element,
        { y: -distance / 2 },
        {
          y: distance / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });
  }

  countUp(element: HTMLElement, value: number, suffix = ''): void {
    if (this.reducedMotion()) {
      element.textContent = `${value}${suffix}`;
      return;
    }

    const counter = { current: 0 };
    gsap.to(counter, {
      current: value,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = `${Math.round(counter.current)}${suffix}`;
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        once: true
      }
    });
  }

  magneticButtons(scope: Element, selector = '[data-magnetic]'): () => void {
    const cleanups: Array<() => void> = [];

    if (this.reducedMotion()) {
      return () => undefined;
    }

    gsap.utils.toArray<HTMLElement>(selector, scope).forEach((button) => {
      const moveX = gsap.quickTo(button, 'x', { duration: 0.5, ease: 'power3.out' });
      const moveY = gsap.quickTo(button, 'y', { duration: 0.5, ease: 'power3.out' });
      const onMove = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        moveX((event.clientX - rect.left - rect.width / 2) * 0.18);
        moveY((event.clientY - rect.top - rect.height / 2) * 0.18);
      };
      const onLeave = () => {
        moveX(0);
        moveY(0);
      };

      button.addEventListener('mousemove', onMove);
      button.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        button.removeEventListener('mousemove', onMove);
        button.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }

  horizontalGallery(section: Element, track: Element): () => void {
    if (this.reducedMotion()) {
      return () => undefined;
    }

    const media = gsap.matchMedia();
    media.add('(min-width: 768px)', () => {
      const distance = () => Math.max(0, (track as HTMLElement).scrollWidth - window.innerWidth + 96);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    });

    return () => media.revert();
  }

  refresh(): void {
    ScrollTrigger.refresh();
  }
}
