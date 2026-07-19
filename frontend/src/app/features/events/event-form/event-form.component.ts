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
    <div class="modal-overlay" (click)="cancelled.emit()">
      <div class="modal" (click)="$event.stopPropagation()">

        <div class="modal-header">
          <div>
            <h2 class="text-base font-black text-ghost">{{ event ? 'Edit Event' : 'New Event' }}</h2>
            <p class="text-xs text-fog mt-0.5">{{ event ? 'Update event details' : 'Schedule a new car meet or show' }}</p>
          </div>
          <button (click)="cancelled.emit()" class="btn-icon">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="modal-body space-y-4">
          <div class="field">
            <label class="label">Event name</label>
            <input formControlName="name" class="input"
                   [class.input-error]="form.get('name')?.invalid && form.get('name')?.touched"
                   placeholder="Summer Car Show 2025">
            @if (form.get('name')?.invalid && form.get('name')?.touched) {
              <span class="field-error">Event name is required.</span>
            }
          </div>

          <div class="field">
            <label class="label">Description</label>
            <textarea formControlName="description" rows="3" class="input"
                      placeholder="What's happening at this event?"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="field">
              <label class="label">Date</label>
              <input formControlName="eventDate" type="date" class="input"
                     [class.input-error]="form.get('eventDate')?.invalid && form.get('eventDate')?.touched">
              @if (form.get('eventDate')?.invalid && form.get('eventDate')?.touched) {
                <span class="field-error">Date required.</span>
              }
            </div>
            <div class="field">
              <label class="label">Location</label>
              <input formControlName="location" class="input"
                     [class.input-error]="form.get('location')?.invalid && form.get('location')?.touched"
                     placeholder="City, Venue">
              @if (form.get('location')?.invalid && form.get('location')?.touched) {
                <span class="field-error">Location required.</span>
              }
            </div>
          </div>

          <div class="modal-footer px-0 pb-0 pt-2">
            <button type="submit" class="btn-primary flex-1 h-11" [disabled]="saving()">
              @if (saving()) {
                <div class="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                Saving…
              } @else {
                {{ event ? 'Update Event' : 'Create Event' }}
              }
            </button>
            <button type="button" class="btn-secondary flex-1 h-11" (click)="cancelled.emit()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
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
    if (this.event) this.form.patchValue({ ...this.event, eventDate: this.event.eventDate?.slice(0, 10) });
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
