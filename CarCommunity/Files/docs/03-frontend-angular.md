---
title: Angular Frontend
description: Angular architecture, modules, services, and UI patterns.
---

# Angular Frontend Architecture

## 🧱 Folder Structure
```
/src/app
 ├── core/
 ├── shared/
 ├── features/
 │    ├── home/
 │    ├── cars/
 │    ├── feed/
 │    ├── profile/
 │    ├── events/
 │    └── admin/
 └── app-routing.module.ts
```

## 🧩 Services Example
```typescript
@Injectable({ providedIn: 'root' })
export class CarService {
  private readonly baseUrl = environment.apiUrl + '/cars';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Car[]> { return this.http.get<Car[]>(this.baseUrl); }
}
```

## 🎨 UI Guidelines
- TailwindCSS with dark theme as default  
- Angular Animations for smooth transitions  
- Component-based structure (atomic design)  

## 💾 State Management
- Use Angular **signals** or **NgRx**  
- Cache feed data with RxJS operators (shareReplay, tap)  
