import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { MotionService } from '../../../service/motion.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements AfterViewInit, OnDestroy {
  @ViewChild('loginRoot') loginRoot?: ElementRef<HTMLElement>;

  readonly form = {
    identity: '',
    password: '',
    remember: false
  };
  readonly attempted = signal(false);
  readonly submitted = signal(false);

  private readonly motion = inject(MotionService);
  private context?: gsap.Context | null;
  private cleanupMagnetic?: () => void;

  ngAfterViewInit(): void {
    const root = this.loginRoot?.nativeElement;
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

  submitLogin(valid: boolean | null): void {
    if (!valid) {
      this.attempted.set(true);
      return;
    }

    this.attempted.set(false);
    this.submitted.set(true);
    this.form.password = '';
    this.motion.refresh();
  }

  resetLogin(): void {
    this.form.identity = '';
    this.form.password = '';
    this.form.remember = false;
    this.attempted.set(false);
    this.submitted.set(false);
  }
}
