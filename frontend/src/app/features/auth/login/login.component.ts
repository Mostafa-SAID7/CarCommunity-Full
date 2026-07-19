import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="card p-8">
      <h2 class="text-xl font-bold text-gray-900 mb-1">Sign in</h2>
      <p class="text-sm text-gray-500 mb-6">Welcome back to AutoSphere</p>

      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
        <div>
          <label class="form-label">Email</label>
          <input formControlName="email" type="email" class="form-input"
                 placeholder="you@example.com">
          @if (form.get('email')?.invalid && form.get('email')?.touched) {
            <p class="text-xs text-red-500 mt-1">Valid email is required.</p>
          }
        </div>

        <div>
          <label class="form-label">Password</label>
          <input formControlName="password" type="password" class="form-input"
                 placeholder="••••••••">
          @if (form.get('password')?.invalid && form.get('password')?.touched) {
            <p class="text-xs text-red-500 mt-1">Password is required.</p>
          }
        </div>

        <button type="submit" class="btn-primary w-full mt-2" [disabled]="loading()">
          {{ loading() ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-5">
        Don't have an account?
        <a routerLink="/auth/register" class="text-primary-600 font-medium hover:underline ml-1">Register</a>
      </p>
    </div>
  `
})
export class LoginComponent {
  private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private toast  = inject(ToastService);
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
      next: () => { this.router.navigate(['/cars']); },
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false),
    });
  }
}
