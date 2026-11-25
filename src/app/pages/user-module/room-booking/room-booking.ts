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

@Component({
  selector: 'app-room-booking',
  imports: [NgClass, FormsModule, RouterLink, CtaStrip, PageHero, SectionHeading],
  templateUrl: './room-booking.html',
  styleUrl: './room-booking.scss'
})
export class RoomBooking implements AfterViewInit, OnDestroy {
  @ViewChild('bookingRoot') bookingRoot?: ElementRef<HTMLElement>;

  readonly content = inject(SiteContentService);
  readonly trustPoints = [
    {
      title: 'A personal reply',
      detail: 'Our guest care team writes to you directly, usually within a day.'
    },
    {
      title: 'No payment today',
      detail: 'This is a request, not a transaction. Details are confirmed by email.'
    },
    {
      title: 'Arrive unhurried',
      detail: 'Early arrivals are welcome to tea, a quiet walk and the evening kirtan.'
    }
  ];
  readonly form = {
    name: '',
    email: '',
    phone: '',
    notes: ''
  };
  readonly selectedRoomId = signal(this.content.rooms[0].id);
  readonly checkIn = signal('');
  readonly checkOut = signal('');
  readonly guests = signal('2');
  readonly submitted = signal(false);
  readonly selectedRoom = computed(() => this.content.rooms.find((room) => room.id === this.selectedRoomId()));
  readonly maxGuests = computed(() => Number.parseInt(this.selectedRoom()?.capacity ?? '2', 10) || 2);
  readonly guestOptions = computed(() =>
    Array.from({ length: this.maxGuests() }, (_, index) => index + 1)
  );
  readonly nights = computed(() => {
    const start = this.checkIn();
    const end = this.checkOut();
    if (!start || !end) {
      return 0;
    }
    const difference = new Date(end).getTime() - new Date(start).getTime();
    return difference > 0 ? Math.max(1, Math.ceil(difference / 86400000)) : 1;
  });
  readonly estimatedTotal = computed(() => (this.selectedRoom()?.price ?? 0) * this.nights());

  private readonly motion = inject(MotionService);
  private context?: gsap.Context | null;
  private cleanupMagnetic?: () => void;

  ngAfterViewInit(): void {
    const root = this.bookingRoot?.nativeElement;
    if (!root) {
      return;
    }

    this.context = this.motion.create(root, () => {
      this.motion.pageEnter(root);
      this.motion.reveal(root);
      this.motion.stagger(root, '.room-item', root.querySelector('#room-collection') ?? root);
      this.motion.parallax(root, '[data-parallax]', 68);
    });

    this.cleanupMagnetic = this.motion.magneticButtons(root);
    this.motion.refresh();
  }

  ngOnDestroy(): void {
    this.cleanupMagnetic?.();
    this.context?.revert();
  }

  selectRoom(roomId: string): void {
    this.selectedRoomId.set(roomId);
    const selected = this.content.rooms.find((room) => room.id === roomId);
    const capacity = Number.parseInt(selected?.capacity ?? '2', 10) || 2;
    if (Number(this.guests()) > capacity) {
      this.guests.set(String(capacity));
    }
  }

  setCheckIn(value: string): void {
    this.checkIn.set(value);
    if (this.checkOut() && this.checkOut() <= value) {
      this.checkOut.set('');
    }
  }

  setCheckOut(value: string): void {
    this.checkOut.set(value);
  }

  submitBooking(valid: boolean | null): void {
    if (!valid) {
      return;
    }
    this.submitted.set(true);
    this.motion.refresh();
  }

  resetBooking(): void {
    this.form.name = '';
    this.form.email = '';
    this.form.phone = '';
    this.form.notes = '';
    this.selectedRoomId.set(this.content.rooms[0].id);
    this.checkIn.set('');
    this.checkOut.set('');
    this.guests.set('2');
    this.submitted.set(false);
  }
}
