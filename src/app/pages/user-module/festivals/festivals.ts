import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { MotionService } from '../../../service/motion.service';
import { SiteContentService } from '../../../service/site-content.service';
import { CtaStrip } from '../../../shared/cta-strip/cta-strip';
import { PageHero } from '../../../shared/page-hero/page-hero';
import { SectionHeading } from '../../../shared/section-heading/section-heading';

@Component({
  selector: 'app-festivals',
  imports: [NgClass, RouterLink, CtaStrip, PageHero, SectionHeading],
  templateUrl: './festivals.html',
  styleUrl: './festivals.scss'
})
export class Festivals implements AfterViewInit, OnDestroy {
  @ViewChild('festivalsRoot') festivalsRoot?: ElementRef<HTMLElement>;

  readonly content = inject(SiteContentService);

  private readonly motion = inject(MotionService);
  private context?: gsap.Context | null;
  private cleanupMagnetic?: () => void;

  ngAfterViewInit(): void {
    const root = this.festivalsRoot?.nativeElement;
    if (!root) {
      return;
    }

    this.context = this.motion.create(root, () => {
      this.motion.pageEnter(root);
      this.motion.reveal(root);
      this.motion.stagger(root, '.festival-list-item', root.querySelector('#festival-calendar') ?? root);
      this.motion.parallax(root, '[data-parallax]', 76);
    });

    this.cleanupMagnetic = this.motion.magneticButtons(root);
    this.motion.refresh();
  }

  ngOnDestroy(): void {
    this.cleanupMagnetic?.();
    this.context?.revert();
  }
}
