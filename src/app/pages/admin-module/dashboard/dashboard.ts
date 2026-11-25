import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ActivityItem, BookingRecord, DonationRecord, Festival, StatCard } from '../../../model/site.models';
import { MotionService } from '../../../service/motion.service';
import { SiteContentService } from '../../../service/site-content.service';

type StatView = StatCard & { count: number; countable: boolean };

@Component({
  selector: 'app-dashboard',
  imports: [NgClass],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements AfterViewInit, OnDestroy {
  @ViewChild('dashboardRoot') dashboardRoot?: ElementRef<HTMLElement>;

  private readonly content = inject(SiteContentService);
  private readonly motion = inject(MotionService);

  readonly today = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());
  readonly stats: StatView[] = this.content.stats.map((stat) => ({
    ...stat,
    count: Number(stat.value.replace(/[^0-9]/g, '')) || 0,
    countable: /^\d+$/.test(stat.value)
  }));
  readonly donations: DonationRecord[] = this.content.recentDonations;
  readonly bookings: BookingRecord[] = this.content.recentBookings;
  readonly activities: ActivityItem[] = this.content.recentActivity;
  readonly festivals: Festival[] = this.content.festivals.slice(0, 3);
  readonly chart = this.content.donationAnalytics;
  readonly months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  readonly chartMax = Math.max(...this.chart, 1);
  readonly peakMonth = this.months[this.chart.indexOf(this.chartMax)] ?? this.months[0];

  private context?: gsap.Context | null;

  ngAfterViewInit(): void {
    const root = this.dashboardRoot?.nativeElement;
    if (!root) {
      return;
    }

    this.context = this.motion.create(root, () => {
      this.motion.pageEnter(root);
      this.motion.reveal(root);
      this.motion.stagger(root, '[data-stat]', root.querySelector('#stats') ?? root);
      root.querySelectorAll<HTMLElement>('[data-count]').forEach((element) => {
        this.motion.countUp(element, Number(element.dataset['count'] ?? 0), element.dataset['suffix'] ?? '');
      });
    });

    this.motion.refresh();
  }

  ngOnDestroy(): void {
    this.context?.revert();
  }

  formatAmount(amount: number): string {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
}
