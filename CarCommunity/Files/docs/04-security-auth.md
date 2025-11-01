---
title: Security & Authentication
description: JWT authentication, authorization, and best practices.
---

# Security and Authentication

## 🔐 JWT Flow
1. User logs in via `/api/auth/login`
2. Server returns JWT token
3. Angular stores it in `localStorage`
4. `AuthInterceptor` attaches `Authorization` header
5. API validates via `[Authorize]`

## 🧠 Example AuthInterceptor
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (!token) return next.handle(req);
    return next.handle(req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) }));
  }
}
```

## 🛡️ Security Practices
- Use HTTPS only  
- Store JWT in secure storage  
- Rotate keys and tokens periodically  
- Apply role-based authorization for admin endpoints  
