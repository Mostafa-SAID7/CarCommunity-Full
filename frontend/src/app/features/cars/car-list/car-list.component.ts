import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { ToastService } from '../../../core/services/toast.service';
import { Car } from '../../../core/models/car.model';
import { CarCardComponent } from '../../../shared/components/car-card/car-card.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CarFormComponent } from '../car-form/car-form.component';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CarCardComponent, SpinnerComponent, CarFormComponent],
  template: `
    <div>
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Cars</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ cars().length }} vehicles registered</p>
        </div>
        <button class="btn-primary" (click)="openForm()">+ Add Car</button>
      </div>

      <!-- Loading -->
      @if (loading()) { <app-spinner /> }

      <!-- Grid -->
      @if (!loading()) {
        @if (cars().length > 0) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            @for (car of cars(); track car.id) {
              <app-car-card [car]="car"
                (edit)="openForm($event)"
                (delete)="onDelete($event)" />
            }
          </div>
        } @else {
          <div class="text-center py-20 text-gray-400">
            <div class="text-5xl mb-4">🚗</div>
            <p class="font-medium">No cars yet</p>
            <p class="text-sm mt-1">Add your first vehicle to get started.</p>
          </div>
        }
      }

      <!-- Form modal -->
      @if (showForm()) {
        <app-car-form [car]="selectedCar()"
          (saved)="onSaved()"
          (cancelled)="showForm.set(false)" />
      }
    </div>
  `
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
      next: data => { this.cars.set(data); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }

  openForm(car: Car | null = null): void {
    this.selectedCar.set(car);
    this.showForm.set(true);
  }

  onSaved(): void {
    this.showForm.set(false);
    this.load();
    this.toast.success('Car saved successfully.');
  }

  onDelete(id: string): void {
    if (!confirm('Delete this car?')) return;
    this.carSvc.delete(id).subscribe({
      next: () => { this.cars.update(c => c.filter(x => x.id !== id)); this.toast.success('Car deleted.'); },
    });
  }
}
