import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Customer, CreateCustomerDto, UpdateCustomerDto } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private url = `${environment.apiUrl}/customers`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Customer[]>                         { return this.http.get<Customer[]>(this.url); }
  getById(id: string): Observable<Customer>                { return this.http.get<Customer>(`${this.url}/${id}`); }
  create(dto: CreateCustomerDto): Observable<Customer>     { return this.http.post<Customer>(this.url, dto); }
  update(id: string, dto: UpdateCustomerDto): Observable<void> { return this.http.put<void>(`${this.url}/${id}`, dto); }
  delete(id: string): Observable<void>                     { return this.http.delete<void>(`${this.url}/${id}`); }
}
