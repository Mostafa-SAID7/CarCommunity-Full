import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { Car } from '../../../core/models/car.model';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  template: `
    <div>
      <a routerLink="/cars" class="inline-flex items-center gap-1 text-sm text-gray-500
                                   hover:text-gray-700 mb-5">← Back to Cars</a>

      @if (loading()) { <app-spinner /> }

      @if (!loading() && car()) {
        <div class="card overflow-hidden max-w-2xl">
          @if (car()!.imageUrl) {
            <img [src]="car()!.imageUrl" [alt]="car()!.make + ' ' + car()!.model"
                 class="w-full h-72 object-cover">
          } @else {
            <div class="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300
                        flex items-center justify-center">
              <span class="text-6xl">🚗</span>
            </div>
          }
          <div class="p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">{{ car()!.make }} {{ car()!.model }}</h1>
                <span class="badge-primary mt-2 inline-block">{{ car()!.year }}</span>
              </div>
            </div>
            <p class="text-gray-600 mt-4 leading-relaxed">{{ car()!.description || 'No description provided.' }}</p>
          </div>
        </div>
      }

      @if (!loading() && !car()) {
        <p class="text-gray-500">Car not found.</p>
      }
    </div>
  `
})
export class CarDetailComponent implements OnInit {
  private route  = inject(ActivatedRoute);
  private carSvc = inject(CarService);

  car     = signal<Car | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.carSvc.getById(id).subscribe({
      next: data => { this.car.set(data); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }
}
