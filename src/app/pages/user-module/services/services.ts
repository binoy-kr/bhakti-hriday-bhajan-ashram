import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { MotionService } from '../../../service/motion.service';
import { SiteContentService } from '../../../service/site-content.service';
import { CtaStrip } from '../../../shared/cta-strip/cta-strip';
import { PageHero } from '../../../shared/page-hero/page-hero';
import { SectionHeading } from '../../../shared/section-heading/section-heading';

@Component({
  selector: 'app-services',
  imports: [NgClass, RouterLink, CtaStrip, PageHero, SectionHeading],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services implements AfterViewInit, OnDestroy {
  @ViewChild('servicesRoot') servicesRoot?: ElementRef<HTMLElement>;

  readonly content = inject(SiteContentService);
  readonly rhythm = [
    {
      time: '06:00',
      title: 'First lamp',
      detail: 'The day opens with flowers, Vedic chants and a quiet offering before the grove begins to stir.'
    },
    {
      time: '09:30',
      title: 'Wisdom circle',
      detail: 'A conversation on the Bhagavata and the Gita Govinda, with space for questions and lived application.'
    },
    {
      time: '13:00',
      title: 'Prasad & seva',
      detail: 'A shared meal followed by hands-on service in the gardens, kitchen and sacred spaces.'
    },
    {
      time: '17:00',
      title: 'Contemplative hour',
      detail: 'Reading, journaling and guided reflection as the light softens across the courtyard.'
    },
    {
      time: '18:30',
      title: 'Evening kirtan',
      detail: 'Hand percussion, ancient melodies and collective voice gather everyone into one unhurried rhythm.'
    }
  ];

  private readonly motion = inject(MotionService);
  private context?: gsap.Context | null;
  private cleanupMagnetic?: () => void;

  ngAfterViewInit(): void {
    const root = this.servicesRoot?.nativeElement;
    if (!root) {
      return;
    }

    this.context = this.motion.create(root, () => {
      this.motion.pageEnter(root);
      this.motion.reveal(root);
      this.motion.stagger(root, '.service-card', root.querySelector('.services-grid') ?? root);
      this.motion.stagger(root, '.rhythm-item', root.querySelector('#daily-rhythm') ?? root);
      this.motion.parallax(root, '[data-parallax]', 68);
    });

    this.cleanupMagnetic = this.motion.magneticButtons(root);
    this.motion.refresh();
  }

  ngOnDestroy(): void {
    this.cleanupMagnetic?.();
    this.context?.revert();
  }
}
