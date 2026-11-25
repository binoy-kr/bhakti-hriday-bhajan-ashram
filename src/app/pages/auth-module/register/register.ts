import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { MotionService } from '../../../service/motion.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements AfterViewInit, OnDestroy {
  @ViewChild('registerRoot') registerRoot?: ElementRef<HTMLElement>;

  readonly form = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false
  };
  readonly attempted = signal(false);
  readonly submitted = signal(false);

  private readonly motion = inject(MotionService);
  private context?: gsap.Context | null;
  private cleanupMagnetic?: () => void;

  ngAfterViewInit(): void {
    const root = this.registerRoot?.nativeElement;
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

  passwordsMatch(): boolean {
    return this.form.password === this.form.confirmPassword;
  }

  submitRegister(valid: boolean | null): void {
    if (!valid || !this.passwordsMatch()) {
      this.attempted.set(true);
      return;
    }

    this.attempted.set(false);
    this.submitted.set(true);
    this.form.password = '';
    this.form.confirmPassword = '';
    this.form.terms = false;
    this.motion.refresh();
  }

  resetRegister(): void {
    this.form.name = '';
    this.form.email = '';
    this.form.phone = '';
    this.form.password = '';
    this.form.confirmPassword = '';
    this.form.terms = false;
    this.attempted.set(false);
    this.submitted.set(false);
  }
}
