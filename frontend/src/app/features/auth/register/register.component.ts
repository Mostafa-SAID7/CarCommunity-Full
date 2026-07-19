import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="card-glass p-8 animate-slide-up">
      <div class="mb-7">
        <h2 class="text-xl font-black tracking-tight text-ghost">Join AutoSphere</h2>
        <p class="text-sm text-fog mt-1">Create your account and meet the community</p>
      </div>

      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-5">
        <div class="field">
          <label class="label">Full name</label>
          <input formControlName="fullName" type="text" class="input"
                 [class.input-error]="form.get('fullName')?.invalid && form.get('fullName')?.touched"
                 placeholder="Jane Doe" autocomplete="name">
          @if (form.get('fullName')?.invalid && form.get('fullName')?.touched) {
            <span class="field-error">Full name is required.</span>
          }
        </div>

        <div class="field">
          <label class="label">Email address</label>
          <input formControlName="email" type="email" class="input"
                 [class.input-error]="form.get('email')?.invalid && form.get('email')?.touched"
                 placeholder="you@example.com" autocomplete="email">
          @if (form.get('email')?.invalid && form.get('email')?.touched) {
            <span class="field-error">Please enter a valid email address.</span>
          }
        </div>

        <div class="field">
          <label class="label">Password</label>
          <input formControlName="password" type="password" class="input"
                 [class.input-error]="form.get('password')?.invalid && form.get('password')?.touched"
                 placeholder="Min. 6 characters" autocomplete="new-password">
          @if (form.get('password')?.invalid && form.get('password')?.touched) {
            <span class="field-error">Password must be at least 6 characters.</span>
          }
        </div>

        <button type="submit" class="btn-primary w-full mt-2 h-11" [disabled]="loading()">
          @if (loading()) {
            <div class="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
            Creating account…
          } @else {
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
            Create account
          }
        </button>
      </form>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-iron"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="bg-coal px-3 text-xs text-fog">Already have an account?</span>
        </div>
      </div>

      <a routerLink="/auth/login" class="btn-secondary w-full h-10 text-sm">
        Sign in instead
      </a>
    </div>
  `,
})
export class RegisterComponent {
  private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private router = inject(Router);
  loading = signal(false);

  form = this.fb.group({
    fullName: ['', Validators.required],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.auth.register(this.form.value as any).subscribe({
      next:  () => this.router.navigate(['/cars']),
      error: () => this.loading.set(false),
    });
  }
}
