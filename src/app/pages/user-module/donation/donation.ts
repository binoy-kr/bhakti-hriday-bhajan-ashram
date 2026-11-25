import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { MotionService } from '../../../service/motion.service';
import { SiteContentService } from '../../../service/site-content.service';
import { CtaStrip } from '../../../shared/cta-strip/cta-strip';
import { PageHero } from '../../../shared/page-hero/page-hero';
import { SectionHeading } from '../../../shared/section-heading/section-heading';

type Frequency = 'once' | 'monthly';

@Component({
  selector: 'app-donation',
  imports: [NgClass, FormsModule, RouterLink, CtaStrip, PageHero, SectionHeading],
  templateUrl: './donation.html',
  styleUrl: './donation.scss'
})
export class Donation implements AfterViewInit, OnDestroy {
  @ViewChild('donationRoot') donationRoot?: ElementRef<HTMLElement>;

  readonly content = inject(SiteContentService);
  readonly frequencies: Array<{ value: Frequency; label: string }> = [
    { value: 'once', label: 'One time' },
    { value: 'monthly', label: 'Monthly' }
  ];
  readonly faqs = [
    {
      question: 'Where does my offering go?',
      answer:
        'Your gift supports daily seva, prasad meals, devotional music and the care of the sacred grounds. The impact panel above offers an indicative breakdown.'
    },
    {
      question: 'Is any payment taken on this page?',
      answer:
        'No. This page records your intention and details only. Our team will contact you with the appropriate next step for your offering.'
    },
    {
      question: 'Can I choose my own amount?',
      answer:
        'Yes. Select a tier as a guide or enter any amount in the custom field. Every contribution, large or small, is received with gratitude.'
    }
  ];
  readonly form = {
    name: '',
    email: '',
    message: ''
  };
  readonly frequency = signal<Frequency>('once');
  readonly selectedTierId = signal(this.content.donationTiers.find((tier) => tier.featured)?.id ?? this.content.donationTiers[0].id);
  readonly customAmount = signal('');
  readonly submitted = signal(false);
  readonly selectedTier = computed(() => this.content.donationTiers.find((tier) => tier.id === this.selectedTierId()));
  readonly donationAmount = computed(() => {
    const custom = Number(this.customAmount());
    if (this.customAmount().trim() && Number.isFinite(custom) && custom > 0) {
      return custom;
    }
    return this.selectedTier()?.amount ?? 0;
  });
  readonly impactRows = computed(() => {
    const amount = this.donationAmount();
    return [
      { label: 'Seva & prasad', share: 55, amount: Math.round(amount * 0.55), tone: 'gold' as const },
      { label: 'Kirtan & sacred arts', share: 30, amount: Math.round(amount * 0.3), tone: 'teal' as const },
      { label: 'Guest care & upkeep', share: 15, amount: Math.round(amount * 0.15), tone: 'rose' as const }
    ];
  });

  private readonly motion = inject(MotionService);
  private context?: gsap.Context | null;
  private cleanupMagnetic?: () => void;

  ngAfterViewInit(): void {
    const root = this.donationRoot?.nativeElement;
    if (!root) {
      return;
    }

    this.context = this.motion.create(root, () => {
      this.motion.pageEnter(root);
      this.motion.reveal(root);
      this.motion.stagger(root, '.donation-tier', root.querySelector('#donation-tiers') ?? root);
      this.motion.parallax(root, '[data-parallax]', 76);
    });

    this.cleanupMagnetic = this.motion.magneticButtons(root);
    this.motion.refresh();
  }

  ngOnDestroy(): void {
    this.cleanupMagnetic?.();
    this.context?.revert();
  }

  selectTier(tierId: string): void {
    this.selectedTierId.set(tierId);
    this.customAmount.set('');
  }

  setCustomAmount(value: string): void {
    this.customAmount.set(value);
  }

  setFrequency(frequency: Frequency): void {
    this.frequency.set(frequency);
  }

  submitDonation(valid: boolean | null): void {
    if (!valid || this.donationAmount() <= 0) {
      return;
    }
    this.submitted.set(true);
    this.motion.refresh();
  }

  resetDonation(): void {
    this.form.name = '';
    this.form.email = '';
    this.form.message = '';
    this.frequency.set('once');
    this.selectedTierId.set(this.content.donationTiers.find((tier) => tier.featured)?.id ?? this.content.donationTiers[0].id);
    this.customAmount.set('');
    this.submitted.set(false);
  }
}
