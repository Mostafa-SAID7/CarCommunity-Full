import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../../core/services/car.service';
import { Car } from '../../../core/models/car.model';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
         (click)="cancelled.emit()">
      <div class="card w-full max-w-lg" (click)="$event.stopPropagation()">
        <div class="p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-5">
            {{ car ? 'Edit Car' : 'Add New Car' }}
          </h2>

          <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Make</label>
                <input formControlName="make" class="form-input" placeholder="Toyota">
              </div>
              <div>
                <label class="form-label">Model</label>
                <input formControlName="model" class="form-input" placeholder="Supra">
              </div>
            </div>

            <div>
              <label class="form-label">Year</label>
              <input formControlName="year" type="number" class="form-input" placeholder="2024">
            </div>

            <div>
              <label class="form-label">Description</label>
              <textarea formControlName="description" rows="3" class="form-input resize-none"
                        placeholder="Describe the car..."></textarea>
            </div>

            <div>
              <label class="form-label">Image URL</label>
              <input formControlName="imageUrl" class="form-input" placeholder="https://...">
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
export class CarFormComponent implements OnInit {
  @Input() car: Car | null = null;
  @Output() saved     = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private fb     = inject(FormBuilder);
  private carSvc = inject(CarService);
  saving         = signal(false);

  form = this.fb.group({
    make:        ['', Validators.required],
    model:       ['', Validators.required],
    year:        [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
    description: [''],
    imageUrl:    [''],
  });

  ngOnInit(): void {
    if (this.car) this.form.patchValue(this.car as any);
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const dto = this.form.value as any;
    if (this.car) {
      this.carSvc.update(this.car.id, dto).subscribe({ next: () => this.saved.emit(), error: () => this.saving.set(false) });
    } else {
      this.carSvc.create(dto).subscribe({ next: () => this.saved.emit(), error: () => this.saving.set(false) });
    }
  }
}
