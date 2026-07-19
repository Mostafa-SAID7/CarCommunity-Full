import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../core/services/car.service';
import { ToastService } from '../../../core/services/toast.service';
import { Car } from '../../../core/models/car.model';
import { CarCardComponent } from '../../../shared/components/car-card/car-card.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CarFormComponent } from '../car-form/car-form.component';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, CarCardComponent, SpinnerComponent, CarFormComponent],
  template: `
    <div class="animate-fade-in">
      <!-- Page header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="text-ghost">Car</span>
            <span class="text-crimson-500 ml-2">Garage</span>
          </h1>
          <p class="page-subtitle">
            {{ loading() ? '—' : cars().length }} vehicles registered
          </p>
        </div>
        <button class="btn-primary" (click)="openForm()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Car
        </button>
      </div>

      <!-- Loading -->
      @if (loading()) { <app-spinner /> }

      <!-- Grid -->
      @if (!loading()) {
        @if (cars().length > 0) {
          <div class="grid-cards">
            @for (car of cars(); track car.id) {
              <app-car-card [car]="car"
                (edit)="openForm($event)"
                (delete)="onDelete($event)" />
            }
          </div>
        } @else {
          <div class="empty-state">
            <div class="w-20 h-20 rounded-2xl bg-crimson-900/20 border border-crimson-800/30
                        flex items-center justify-center mb-5">
              <svg class="w-10 h-10 text-crimson-700" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8zM13 6l2.5 5H20l1 4v1h-2"/>
              </svg>
            </div>
            <p class="empty-title">No cars yet</p>
            <p class="empty-body">Add your first vehicle to fill the garage.</p>
            <button class="btn-primary mt-5" (click)="openForm()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add First Car
            </button>
          </div>
        }
      }

      @if (showForm()) {
        <app-car-form [car]="selectedCar()"
          (saved)="onSaved()"
          (cancelled)="showForm.set(false)" />
      }
    </div>
  `,
})
export class CarListComponent implements OnInit {
  private carSvc = inject(CarService);
  private toast  = inject(ToastService);

  cars        = signal<Car[]>([]);
  loading     = signal(true);
  showForm    = signal(false);
  selectedCar = signal<Car | null>(null);

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.carSvc.getAll().subscribe({
      next:  data => { this.cars.set(data); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }

  openForm(car: Car | null = null): void { this.selectedCar.set(car); this.showForm.set(true); }

  onSaved(): void { this.showForm.set(false); this.load(); this.toast.success('Car saved successfully.'); }

  onDelete(id: string): void {
    if (!confirm('Delete this car?')) return;
    this.carSvc.delete(id).subscribe({
      next: () => { this.cars.update(c => c.filter(x => x.id !== id)); this.toast.success('Car deleted.'); },
    });
  }
}
