import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarEvent } from '../../../core/models/event.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-hover flex flex-col">
      <!-- Accent bar -->
      <div class="h-1 w-full bg-red-gradient"></div>

      <div class="flex flex-col flex-1 p-5 gap-4">
        <!-- Header -->
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-crimson-900/30 border border-crimson-800/40
                      flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-crimson-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="font-bold text-ghost text-sm leading-snug">{{ event.name }}</h3>
            <p class="text-xs text-fog mt-1 line-clamp-2 leading-relaxed">{{ event.description }}</p>
          </div>
        </div>

        <!-- Meta -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 text-xs text-mist">
            <svg class="w-3.5 h-3.5 text-crimson-500 flex-shrink-0" fill="none" stroke="currentColor"
                 stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>{{ event.eventDate | date:'MMM d, y' }}</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-mist">
            <svg class="w-3.5 h-3.5 text-crimson-500 flex-shrink-0" fill="none" stroke="currentColor"
                 stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span class="truncate">{{ event.location }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-2 mt-auto">
          <button (click)="edit.emit(event)" class="btn-secondary text-xs h-8 px-3 flex-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Edit
          </button>
          <button (click)="delete.emit(event.id)" class="btn-danger text-xs h-8 px-3 flex-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/><path stroke-linecap="round" stroke-linejoin="round"
              d="M19 6l-1 14H6L5 6m5 0V4h4v2"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
})
export class EventCardComponent {
  @Input() event!: CarEvent;
  @Output() edit   = new EventEmitter<CarEvent>();
  @Output() delete = new EventEmitter<string>();
}
