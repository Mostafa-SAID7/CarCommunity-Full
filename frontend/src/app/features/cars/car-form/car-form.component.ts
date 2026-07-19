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
    <div class="modal-overlay" (click)="cancelled.emit()">
      <div class="modal" (click)="$event.stopPropagation()">

        <div class="modal-header">
          <div>
            <h2 class="text-base font-black text-ghost">{{ car ? 'Edit Car' : 'Add New Car' }}</h2>
            <p class="text-xs text-fog mt-0.5">{{ car ? 'Update vehicle details' : 'Register a new vehicle' }}</p>
          </div>
          <button (click)="cancelled.emit()" class="btn-icon">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="modal-body space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="field">
              <label class="label">Make</label>
              <input formControlName="make" class="input"
                     [class.input-error]="form.get('make')?.invalid && form.get('make')?.touched"
                     placeholder="Toyota">
              @if (form.get('make')?.invalid && form.get('make')?.touched) {
                <span class="field-error">Required</span>
              }
            </div>
            <div class="field">
              <label class="label">Model</label>
              <input formControlName="model" class="input"
                     [class.input-error]="form.get('model')?.invalid && form.get('model')?.touched"
                     placeholder="Supra">
              @if (form.get('model')?.invalid && form.get('model')?.touched) {
                <span class="field-error">Required</span>
              }
            </div>
          </div>

          <div class="field">
            <label class="label">Year</label>
            <input formControlName="year" type="number" class="input"
                   [class.input-error]="form.get('year')?.invalid && form.get('year')?.touched"
                   placeholder="2024">
            @if (form.get('year')?.invalid && form.get('year')?.touched) {
              <span class="field-error">Enter a valid year (1900+)</span>
            }
          </div>

          <div class="field">
            <label class="label">Description</label>
            <textarea formControlName="description" rows="3" class="input"
                      placeholder="Describe the car — mods, condition, story…"></textarea>
          </div>

          <div class="field">
            <label class="label">Image URL</label>
            <input formControlName="imageUrl" class="input" placeholder="https://…">
          </div>

          <div class="modal-footer px-0 pb-0 pt-2">
            <button type="submit" class="btn-primary flex-1 h-11" [disabled]="saving()">
              @if (saving()) {
                <div class="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                Saving…
              } @else {
                {{ car ? 'Update Car' : 'Add Car' }}
              }
            </button>
            <button type="button" class="btn-secondary flex-1 h-11" (click)="cancelled.emit()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
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

  ngOnInit(): void { if (this.car) this.form.patchValue(this.car as any); }

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
