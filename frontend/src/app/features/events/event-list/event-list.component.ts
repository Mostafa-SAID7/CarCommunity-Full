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
    <div class="animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="text-ghost">Car</span>
            <span class="text-crimson-500 ml-2">Events</span>
          </h1>
          <p class="page-subtitle">{{ loading() ? '—' : events().length }} upcoming events</p>
        </div>
        <button class="btn-primary" (click)="openForm()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Event
        </button>
      </div>

      @if (loading()) { <app-spinner /> }

      @if (!loading()) {
        @if (events().length > 0) {
          <div class="grid-cards-3">
            @for (event of events(); track event.id) {
              <app-event-card [event]="event"
                (edit)="openForm($event)"
                (delete)="onDelete($event)" />
            }
          </div>
        } @else {
          <div class="empty-state">
            <div class="w-20 h-20 rounded-2xl bg-crimson-900/20 border border-crimson-800/30
                        flex items-center justify-center mb-5">
              <svg class="w-10 h-10 text-crimson-700" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <p class="empty-title">No events scheduled</p>
            <p class="empty-body">Schedule your first car meet or show.</p>
            <button class="btn-primary mt-5" (click)="openForm()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Schedule Event
            </button>
          </div>
        }
      }

      @if (showForm()) {
        <app-event-form [event]="selectedEvent()"
          (saved)="onSaved()"
          (cancelled)="showForm.set(false)" />
      }
    </div>
  `,
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
      next:  data => { this.events.set(data); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }

  openForm(event: CarEvent | null = null): void { this.selectedEvent.set(event); this.showForm.set(true); }
  onSaved(): void { this.showForm.set(false); this.load(); this.toast.success('Event saved.'); }

  onDelete(id: string): void {
    if (!confirm('Delete this event?')) return;
    this.eventSvc.delete(id).subscribe({
      next: () => { this.events.update(e => e.filter(x => x.id !== id)); this.toast.success('Event deleted.'); },
    });
  }
}
