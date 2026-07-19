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
    <div class="animate-fade-in">
      <a routerLink="/cars"
         class="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase
                text-fog hover:text-crimson-400 transition-colors duration-150 mb-6">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Garage
      </a>

      @if (loading()) { <app-spinner /> }

      @if (!loading() && car()) {
        <div class="max-w-2xl">
          <div class="card overflow-hidden">
            <!-- Hero image -->
            <div class="relative h-72 bg-onyx overflow-hidden">
              @if (car()!.imageUrl) {
                <img [src]="car()!.imageUrl" [alt]="car()!.make + ' ' + car()!.model"
                     class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-transparent"></div>
              } @else {
                <div class="flex items-center justify-center h-full">
                  <svg class="w-24 h-24 text-iron" fill="none" stroke="currentColor" stroke-width="0.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8zM13 6l2.5 5H20l1 4v1h-2"/>
                  </svg>
                </div>
              }
              <!-- Accent bar -->
              <div class="absolute bottom-0 left-0 right-0 h-1 bg-red-gradient"></div>
            </div>

            <!-- Details -->
            <div class="p-6">
              <div class="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 class="text-2xl font-black tracking-tight text-ghost">
                    {{ car()!.make }}
                    <span class="text-crimson-500">{{ car()!.model }}</span>
                  </h1>
                </div>
                <span class="badge-red text-sm flex-shrink-0">{{ car()!.year }}</span>
              </div>

              @if (car()!.description) {
                <div class="border-t border-iron pt-4">
                  <p class="text-xs font-bold tracking-widest uppercase text-fog mb-2">About</p>
                  <p class="text-sm text-mist leading-relaxed">{{ car()!.description }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      }

      @if (!loading() && !car()) {
        <div class="empty-state">
          <p class="empty-title">Car not found.</p>
          <a routerLink="/cars" class="btn-primary mt-4">Back to Garage</a>
        </div>
      }
    </div>
  `,
})
export class CarDetailComponent implements OnInit {
  private route  = inject(ActivatedRoute);
  private carSvc = inject(CarService);
  car     = signal<Car | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.carSvc.getById(id).subscribe({
      next:  data => { this.car.set(data); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }
}
