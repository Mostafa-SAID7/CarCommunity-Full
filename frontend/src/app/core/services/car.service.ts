import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Car, CreateCarDto, UpdateCarDto } from '../models/car.model';

@Injectable({ providedIn: 'root' })
export class CarService {
  private url = `${environment.apiUrl}/cars`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Car[]>              { return this.http.get<Car[]>(this.url); }
  getById(id: string): Observable<Car>     { return this.http.get<Car>(`${this.url}/${id}`); }
  create(dto: CreateCarDto): Observable<Car>        { return this.http.post<Car>(this.url, dto); }
  update(id: string, dto: UpdateCarDto): Observable<void> { return this.http.put<void>(`${this.url}/${id}`, dto); }
  delete(id: string): Observable<void>     { return this.http.delete<void>(`${this.url}/${id}`); }
}
