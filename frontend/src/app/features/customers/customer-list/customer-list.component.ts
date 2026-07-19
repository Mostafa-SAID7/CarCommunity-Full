import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../core/services/customer.service';
import { ToastService } from '../../../core/services/toast.service';
import { Customer } from '../../../core/models/customer.model';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, CustomerFormComponent],
  template: `
    <div class="animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="text-ghost">Community</span>
            <span class="text-crimson-500 ml-2">Members</span>
          </h1>
          <p class="page-subtitle">{{ loading() ? '—' : customers().length }} registered members</p>
        </div>
        <button class="btn-primary" (click)="openForm()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Member
        </button>
      </div>

      @if (loading()) { <app-spinner /> }

      @if (!loading()) {
        @if (customers().length > 0) {
          <!-- Stats strip -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div class="card p-4">
              <p class="label mb-1">Total Members</p>
              <p class="text-2xl font-black text-ghost">{{ customers().length }}</p>
            </div>
            <div class="card p-4">
              <p class="label mb-1">This Session</p>
              <p class="text-2xl font-black text-crimson-400">+{{ customers().length }}</p>
            </div>
          </div>

          <!-- Table -->
          <div class="table-wrap">
            <table class="table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th class="hidden sm:table-cell">Email</th>
                  <th class="hidden md:table-cell">Phone</th>
                  <th class="w-0"></th>
                </tr>
              </thead>
              <tbody>
                @for (c of customers(); track c.id) {
                  <tr>
                    <td>
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-xl bg-crimson-900/30 border border-crimson-800/30
                                    flex items-center justify-center text-crimson-400 text-xs font-black flex-shrink-0">
                          {{ c.fullName.charAt(0).toUpperCase() }}
                        </div>
                        <span class="font-semibold text-ghost">{{ c.fullName }}</span>
                      </div>
                    </td>
                    <td class="hidden sm:table-cell text-mist">{{ c.email }}</td>
                    <td class="hidden md:table-cell text-mist">{{ c.phoneNumber }}</td>
                    <td>
                      <div class="flex items-center justify-end gap-2">
                        <button (click)="openForm(c)" class="btn-secondary text-xs h-8 px-3">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                          </svg>
                          Edit
                        </button>
                        <button (click)="onDelete(c.id)" class="btn-danger text-xs h-8 px-3">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <polyline points="3 6 5 6 21 6"/>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 6l-1 14H6L5 6m5 0V4h4v2"/>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        } @else {
          <div class="empty-state">
            <div class="w-20 h-20 rounded-2xl bg-crimson-900/20 border border-crimson-800/30
                        flex items-center justify-center mb-5">
              <svg class="w-10 h-10 text-crimson-700" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </div>
            <p class="empty-title">No members yet</p>
            <p class="empty-body">Add your first community member.</p>
            <button class="btn-primary mt-5" (click)="openForm()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add First Member
            </button>
          </div>
        }
      }

      @if (showForm()) {
        <app-customer-form [customer]="selectedCustomer()"
          (saved)="onSaved()"
          (cancelled)="showForm.set(false)" />
      }
    </div>
  `,
})
export class CustomerListComponent implements OnInit {
  private custSvc = inject(CustomerService);
  private toast   = inject(ToastService);

  customers        = signal<Customer[]>([]);
  loading          = signal(true);
  showForm         = signal(false);
  selectedCustomer = signal<Customer | null>(null);

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.custSvc.getAll().subscribe({
      next:  data => { this.customers.set(data); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }

  openForm(c: Customer | null = null): void { this.selectedCustomer.set(c); this.showForm.set(true); }
  onSaved(): void { this.showForm.set(false); this.load(); this.toast.success('Member saved.'); }

  onDelete(id: string): void {
    if (!confirm('Remove this member?')) return;
    this.custSvc.delete(id).subscribe({
      next: () => { this.customers.update(c => c.filter(x => x.id !== id)); this.toast.success('Member removed.'); },
    });
  }
}
