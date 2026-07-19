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
    <div class="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
         (click)="cancelled.emit()">
      <div class="card w-full max-w-md" (click)="$event.stopPropagation()">
        <div class="p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-5">
            {{ customer ? 'Edit Customer' : 'Add Customer' }}
          </h2>
          <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
            <div>
              <label class="form-label">Full Name</label>
              <input formControlName="fullName" class="form-input" placeholder="Jane Doe">
            </div>
            <div>
              <label class="form-label">Email</label>
              <input formControlName="email" type="email" class="form-input" placeholder="jane@example.com">
            </div>
            <div>
              <label class="form-label">Phone Number</label>
              <input formControlName="phoneNumber" class="form-input" placeholder="+1 555 000 0000">
            </div>
            <div class="flex gap-3 pt-2">
              <button type="submit" class="btn-primary flex-1" [disabled]="saving()">
                {{ saving() ? 'Saving…' : 'Save' }}
              </button>
              <button type="button" class="btn-secondary flex-1" (click)="cancelled.emit()">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
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
