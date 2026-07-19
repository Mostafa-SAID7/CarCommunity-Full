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
    <div class="card p-8">
      <h2 class="text-xl font-bold text-gray-900 mb-1">Create account</h2>
      <p class="text-sm text-gray-500 mb-6">Join the AutoSphere community</p>

      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
        <div>
          <label class="form-label">Full Name</label>
          <input formControlName="fullName" type="text" class="form-input" placeholder="John Doe">
          @if (form.get('fullName')?.invalid && form.get('fullName')?.touched) {
            <p class="text-xs text-red-500 mt-1">Full name is required.</p>
          }
        </div>

        <div>
          <label class="form-label">Email</label>
          <input formControlName="email" type="email" class="form-input" placeholder="you@example.com">
          @if (form.get('email')?.invalid && form.get('email')?.touched) {
            <p class="text-xs text-red-500 mt-1">Valid email is required.</p>
          }
        </div>

        <div>
          <label class="form-label">Password</label>
          <input formControlName="password" type="password" class="form-input" placeholder="Min. 6 characters">
          @if (form.get('password')?.invalid && form.get('password')?.touched) {
            <p class="text-xs text-red-500 mt-1">Password must be at least 6 characters.</p>
          }
        </div>

        <button type="submit" class="btn-primary w-full mt-2" [disabled]="loading()">
          {{ loading() ? 'Creating account…' : 'Create account' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-5">
        Already have an account?
        <a routerLink="/auth/login" class="text-primary-600 font-medium hover:underline ml-1">Sign in</a>
      </p>
    </div>
  `
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
      next: () => this.router.navigate(['/cars']),
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false),
    });
  }
}
