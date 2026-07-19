import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../core/services/event.service';
import { ToastService } from '../../../core/services/toast.service';
import { CarEvent } from '../../../core/models/event.model';
import { EventCardComponent } from '../../../shared/components/event-card/event-card.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent, SpinnerComponent, EventFormComponent],
  template: `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Events</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ events().length }} upcoming events</p>
        </div>
        <button class="btn-primary" (click)="openForm()">+ Add Event</button>
      </div>

      @if (loading()) { <app-spinner /> }

      @if (!loading()) {
        @if (events().length > 0) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            @for (event of events(); track event.id) {
              <app-event-card [event]="event"
                (edit)="openForm($event)"
                (delete)="onDelete($event)" />
            }
          </div>
        } @else {
          <div class="text-center py-20 text-gray-400">
            <div class="text-5xl mb-4">📅</div>
            <p class="font-medium">No events yet</p>
            <p class="text-sm mt-1">Schedule your first car meet or show.</p>
          </div>
        }
      }

      @if (showForm()) {
        <app-event-form [event]="selectedEvent()"
          (saved)="onSaved()"
          (cancelled)="showForm.set(false)" />
      }
    </div>
  `
})
export class EventListComponent implements OnInit {
  private eventSvc = inject(EventService);
  private toast    = inject(ToastService);

  events        = signal<CarEvent[]>([]);
  loading       = signal(true);
  showForm      = signal(false);
  selectedEvent = signal<CarEvent | null>(null);

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.eventSvc.getAll().subscribe({
      next: data => { this.events.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openForm(event: CarEvent | null = null): void {
    this.selectedEvent.set(event);
    this.showForm.set(true);
  }

  onSaved(): void { this.showForm.set(false); this.load(); this.toast.success('Event saved.'); }

  onDelete(id: string): void {
    if (!confirm('Delete this event?')) return;
    this.eventSvc.delete(id).subscribe({
      next: () => { this.events.update(e => e.filter(x => x.id !== id)); this.toast.success('Event deleted.'); }
    });
  }
}
