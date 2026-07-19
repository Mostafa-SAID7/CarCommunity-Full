import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="card-glass p-8 animate-slide-up">
      <!-- Header -->
      <div class="mb-7">
        <h2 class="text-xl font-black tracking-tight text-ghost">Welcome back</h2>
        <p class="text-sm text-fog mt-1">Sign in to your AutoSphere account</p>
      </div>

      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-5">
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
                 placeholder="••••••••" autocomplete="current-password">
          @if (form.get('password')?.invalid && form.get('password')?.touched) {
            <span class="field-error">Password is required.</span>
          }
        </div>

        <button type="submit" class="btn-primary w-full mt-2 h-11" [disabled]="loading()">
          @if (loading()) {
            <div class="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
            Signing in…
          } @else {
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
            Sign in
          }
        </button>
      </form>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-iron"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="bg-coal px-3 text-xs text-fog">New to AutoSphere?</span>
        </div>
      </div>

      <a routerLink="/auth/register" class="btn-secondary w-full h-10 text-sm">
        Create an account
      </a>
    </div>
  `,
})
export class LoginComponent {
  private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private router = inject(Router);
  loading = signal(false);

  form = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.auth.login(this.form.value as any).subscribe({
      next:     () => this.router.navigate(['/cars']),
      error:    () => this.loading.set(false),
      complete: () => this.loading.set(false),
    });
  }
}
