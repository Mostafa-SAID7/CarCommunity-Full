import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../../core/services/event.service';
import { CarEvent } from '../../../core/models/event.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
         (click)="cancelled.emit()">
      <div class="card w-full max-w-lg" (click)="$event.stopPropagation()">
        <div class="p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-5">
            {{ event ? 'Edit Event' : 'Add Event' }}
          </h2>
          <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
            <div>
              <label class="form-label">Event Name</label>
              <input formControlName="name" class="form-input" placeholder="Summer Car Show">
            </div>
            <div>
              <label class="form-label">Description</label>
              <textarea formControlName="description" rows="3" class="form-input resize-none"
                        placeholder="What's this event about?"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Date</label>
                <input formControlName="eventDate" type="date" class="form-input">
              </div>
              <div>
                <label class="form-label">Location</label>
                <input formControlName="location" class="form-input" placeholder="City, Venue">
              </div>
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
export class EventFormComponent implements OnInit {
  @Input() event: CarEvent | null = null;
  @Output() saved     = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private fb       = inject(FormBuilder);
  private eventSvc = inject(EventService);
  saving           = signal(false);

  form = this.fb.group({
    name:        ['', Validators.required],
    description: [''],
    eventDate:   ['', Validators.required],
    location:    ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.event) {
      this.form.patchValue({
        ...this.event,
        eventDate: this.event.eventDate?.slice(0, 10),
      });
    }
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const dto = this.form.value as any;
    if (this.event) {
      this.eventSvc.update(this.event.id, dto).subscribe({ next: () => this.saved.emit(), error: () => this.saving.set(false) });
    } else {
      this.eventSvc.create(dto).subscribe({ next: () => this.saved.emit(), error: () => this.saving.set(false) });
    }
  }
}
