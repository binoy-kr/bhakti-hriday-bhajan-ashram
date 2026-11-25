import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { MotionService } from '../../../service/motion.service';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword implements AfterViewInit, OnDestroy {
  @ViewChild('forgotRoot') forgotRoot?: ElementRef<HTMLElement>;

  readonly form = { email: '' };
  readonly attempted = signal(false);
  readonly submitted = signal(false);

  private readonly motion = inject(MotionService);
  private context?: gsap.Context | null;
  private cleanupMagnetic?: () => void;

  ngAfterViewInit(): void {
    const root = this.forgotRoot?.nativeElement;
    if (!root) {
      return;
    }

    this.context = this.motion.create(root, () => {
      this.motion.pageEnter(root);
      this.motion.reveal(root);
    });

    this.cleanupMagnetic = this.motion.magneticButtons(root);
    this.motion.refresh();
  }

  ngOnDestroy(): void {
    this.cleanupMagnetic?.();
    this.context?.revert();
  }

  submitReset(valid: boolean | null): void {
    if (!valid) {
      this.attempted.set(true);
      return;
    }

    this.attempted.set(false);
    this.submitted.set(true);
    this.motion.refresh();
  }

  resetRequest(): void {
    this.form.email = '';
    this.attempted.set(false);
    this.submitted.set(false);
  }
}
