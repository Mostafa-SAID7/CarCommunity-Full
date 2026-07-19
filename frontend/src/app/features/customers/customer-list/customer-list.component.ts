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
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Customers</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ customers().length }} members</p>
        </div>
        <button class="btn-primary" (click)="openForm()">+ Add Customer</button>
      </div>

      @if (loading()) { <app-spinner /> }

      @if (!loading()) {
        @if (customers().length > 0) {
          <div class="card overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                  <th class="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                @for (c of customers(); track c.id) {
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-5 py-3 font-medium text-gray-900">{{ c.fullName }}</td>
                    <td class="px-5 py-3 text-gray-500">{{ c.email }}</td>
                    <td class="px-5 py-3 text-gray-500">{{ c.phoneNumber }}</td>
                    <td class="px-5 py-3 text-right">
                      <button (click)="openForm(c)" class="btn-secondary text-xs mr-2">Edit</button>
                      <button (click)="onDelete(c.id)" class="btn-danger text-xs">Delete</button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        } @else {
          <div class="text-center py-20 text-gray-400">
            <div class="text-5xl mb-4">👥</div>
            <p class="font-medium">No customers yet</p>
          </div>
        }
      }

      @if (showForm()) {
        <app-customer-form [customer]="selectedCustomer()"
          (saved)="onSaved()"
          (cancelled)="showForm.set(false)" />
      }
    </div>
  `
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
      next: data => { this.customers.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openForm(c: Customer | null = null): void { this.selectedCustomer.set(c); this.showForm.set(true); }
  onSaved(): void { this.showForm.set(false); this.load(); this.toast.success('Customer saved.'); }

  onDelete(id: string): void {
    if (!confirm('Delete this customer?')) return;
    this.custSvc.delete(id).subscribe({
      next: () => { this.customers.update(c => c.filter(x => x.id !== id)); this.toast.success('Customer deleted.'); }
    });
  }
}
