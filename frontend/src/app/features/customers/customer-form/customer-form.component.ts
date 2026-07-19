import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" (click)="cancelled.emit()">
      <div class="modal" (click)="$event.stopPropagation()">

        <div class="modal-header">
          <div>
            <h2 class="text-base font-black text-ghost">{{ customer ? 'Edit Member' : 'Add Member' }}</h2>
            <p class="text-xs text-fog mt-0.5">{{ customer ? 'Update member details' : 'Register a new community member' }}</p>
          </div>
          <button (click)="cancelled.emit()" class="btn-icon">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="modal-body space-y-4">
          <div class="field">
            <label class="label">Full name</label>
            <input formControlName="fullName" class="input"
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
                   placeholder="jane@example.com" autocomplete="email">
            @if (form.get('email')?.invalid && form.get('email')?.touched) {
              <span class="field-error">Valid email is required.</span>
            }
          </div>

          <div class="field">
            <label class="label">Phone number</label>
            <input formControlName="phoneNumber" class="input"
                   [class.input-error]="form.get('phoneNumber')?.invalid && form.get('phoneNumber')?.touched"
                   placeholder="+1 555 000 0000" autocomplete="tel">
            @if (form.get('phoneNumber')?.invalid && form.get('phoneNumber')?.touched) {
              <span class="field-error">Phone number is required.</span>
            }
          </div>

          <div class="modal-footer px-0 pb-0 pt-2">
            <button type="submit" class="btn-primary flex-1 h-11" [disabled]="saving()">
              @if (saving()) {
                <div class="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                Saving…
              } @else {
                {{ customer ? 'Update Member' : 'Add Member' }}
              }
            </button>
            <button type="button" class="btn-secondary flex-1 h-11" (click)="cancelled.emit()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: Customer | null = null;
  @Output() saved     = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private fb      = inject(FormBuilder);
  private custSvc = inject(CustomerService);
  saving          = signal(false);

  form = this.fb.group({
    fullName:    ['', Validators.required],
    email:       ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
  });

  ngOnInit(): void { if (this.customer) this.form.patchValue(this.customer as any); }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const dto = this.form.value as any;
    if (this.customer) {
      this.custSvc.update(this.customer.id, dto).subscribe({ next: () => this.saved.emit(), error: () => this.saving.set(false) });
    } else {
      this.custSvc.create(dto).subscribe({ next: () => this.saved.emit(), error: () => this.saving.set(false) });
    }
  }
}
