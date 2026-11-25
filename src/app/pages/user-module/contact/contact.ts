import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { MotionService } from '../../../service/motion.service';
import { SiteContentService } from '../../../service/site-content.service';
import { CtaStrip } from '../../../shared/cta-strip/cta-strip';
import { PageHero } from '../../../shared/page-hero/page-hero';
import { SectionHeading } from '../../../shared/section-heading/section-heading';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, RouterLink, CtaStrip, PageHero, SectionHeading],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit, OnDestroy {
  @ViewChild('contactRoot') contactRoot?: ElementRef<HTMLElement>;

  readonly content = inject(SiteContentService);
  readonly submitted = signal(false);
  readonly subjects = [
    'Plan a visit',
    'Room reservation',
    'Festival enquiry',
    'Seva & volunteering',
    'Something else'
  ];
  readonly visitHours = [
    { label: 'Darshan', value: '06:00 — 20:30' },
    { label: 'Morning puja', value: '06:00 · daily' },
    { label: 'Evening kirtan', value: '18:30 · daily' },
    { label: 'Guest desk', value: '09:00 — 19:00' }
  ];
  readonly form = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  private readonly motion = inject(MotionService);
  private context?: gsap.Context | null;
  private cleanupMagnetic?: () => void;

  ngAfterViewInit(): void {
    const root = this.contactRoot?.nativeElement;
    if (!root) {
      return;
    }

    this.context = this.motion.create(root, () => {
      this.motion.pageEnter(root);
      this.motion.reveal(root);
      this.motion.parallax(root, '[data-parallax]', 70);
    });

    this.cleanupMagnetic = this.motion.magneticButtons(root);
    this.motion.refresh();
  }

  ngOnDestroy(): void {
    this.cleanupMagnetic?.();
    this.context?.revert();
  }

  submitMessage(valid: boolean | null): void {
    if (!valid) {
      return;
    }
    this.submitted.set(true);
    this.motion.refresh();
  }

  resetMessage(): void {
    this.form.name = '';
    this.form.email = '';
    this.form.subject = '';
    this.form.message = '';
    this.submitted.set(false);
  }
}
