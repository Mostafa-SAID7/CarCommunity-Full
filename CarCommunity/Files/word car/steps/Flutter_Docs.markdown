# Comprehensive Documentation for Car Maintenance API with Flutter Mobile App

## 1. System Analysis

### 1.1 Overview
The Car Maintenance API is a RESTful service for tracking vehicle maintenance, now with a Flutter mobile app for cross-platform iOS/Android user interaction, replacing the Angular frontend. It allows users (e.g., mechanics, owners, admins) to manage cars, schedule services, record repairs, generate reports, send notifications, enable live chat, support multiple languages, deploy via containers, and includes API versioning, rate limiting, caching, background jobs, predictive maintenance, and a responsive mobile UI. Key goals:
- Improve efficiency in tracking maintenance history.
- Reduce errors in scheduling and billing.
- Provide secure access with authentication.
- Notify users of upcoming maintenance or updates.
- Offer real-time chat for customer support.
- Support internationalization via localization.
- Document APIs clearly using Swagger.
- Automate build, test, and deployment with CI/CD.
- Enable containerization with Docker for portability and scalability.
- Enhance with versioning, rate limiting, caching, and background jobs for robustness.
- Use ML for predictive analytics to anticipate maintenance needs, reducing downtime.
- Provide a modern, responsive mobile app with Flutter for better user experience.

### 1.2 Requirements
#### Functional Requirements:
- Manage Cars: CRUD operations for car details (make, model, year, VIN, etc.) via mobile forms.
- Manage Owners: CRUD for car owners (name, contact, address) with lists and editors.
- Manage Maintenance Records: Log services like oil changes, tire rotations, with dates, costs, and descriptions; mobile screens for adding/viewing history.
- Manage Services: Predefined service types (e.g., oil change, brake repair) with costs; admin UI.
- Reporting: Get maintenance history for a car or owner; dashboard views.
- Search and Filtering: By date, car ID, owner, etc.; search bars in app.
- Authentication: User registration, login, and token-based access; login/register screens.
- Notifications: Send email or push notifications (via Firebase Cloud Messaging) for maintenance reminders; in-app notifications.
- Live Chat: Real-time messaging between users (e.g., owner and mechanic) using WebSockets; chat screen.
- Localization: Support multiple languages (e.g., English, Spanish) for API responses and app UI; language switcher.
- API Documentation: Provide interactive API docs via Swagger UI.
- CI/CD: Automate build, test, and deployment processes for API and mobile app.
- Docker: Containerize the API and database for consistent environments.
- Additional Features: Health checks (/health endpoint) and structured logging with Serilog.
- Enhanced Features: API versioning (v1/v2), rate limiting (IP-based), caching (Redis for GET responses), background jobs (Hangfire for scheduled reminders).
- Predictive Maintenance ML: Use ML.NET binary classification to predict maintenance needs; mobile screen to display predictions.
- Mobile App: Flutter app with screens for all features, services for API calls, navigation, secure storage, SignalR for chat, i18n, Material 3 design.

#### Non-Functional Requirements:
- Performance: Handle up to 1000 records efficiently; real-time chat with low latency; caching to reduce DB hits; ML inference in <1s; smooth mobile UI.
- Security: Use JWT for authentication, hash passwords; secure WebSockets; rate limiting; secure storage in app.
- Scalability: Use repository pattern for easy DB switching; SignalR for chat scaling; Docker for container orchestration; Hangfire for distributed jobs; Flutter for cross-platform.
- Data Integrity: Enforce relationships (e.g., a maintenance record must link to a car).
- Tech Stack: ASP.NET Core API, EF Core for ORM, SQL Server, ASP.NET Core Identity for auth, Swashbuckle for Swagger, SignalR for live chat, MailKit for notifications, Resource files for localization, GitHub Actions for CI/CD, Docker for containerization, Serilog for logging, Microsoft.Extensions.Diagnostics.HealthChecks for health checks, Microsoft.AspNetCore.Mvc.Versioning for versioning, AspNetCoreRateLimit for rate limiting, Microsoft.Extensions.Caching.StackExchangeRedis for caching, Hangfire for background jobs, ML.NET for predictive maintenance, Flutter for mobile app with packages (dio, flutter_secure_storage, signalr_netcore, flutter_localizations, provider).
- Testability: Include unit tests for backend and Flutter app.
- Reliability: Automated CI/CD ensures consistent deployments; health checks for monitoring.

### 1.3 Use Cases
- Actor: Owner
  - Login to app, view car list, see maintenance history (cached), get ML predictions, chat with mechanic, receive push notifications.
- Actor: Mechanic
  - Add/update records via forms, view predictions, chat.
- Actor: Admin
  - Manage types, reports, health check.
- Actor: Any User
  - Register/login, switch language, use versioned features.
- Actor: Developer
  - Swagger for API, CI/CD for deployment, Docker for local dev.
- Actor: Ops
  - Logs, health, rate limits.

### 1.4 Assumptions and Constraints
- One car can have multiple owners (historical), but primary owner for simplicity.
- Notifications via email and push (FCM).
- Live chat is basic (one-to-one or group; stored in DB).
- Localization for strings in API responses and app UI.
- CI/CD uses GitHub Actions; API deploys to Azure App Service as container; Flutter builds APKs/iOS apps.
- Docker uses Linux containers; SQL Server and Redis containers for DB and cache.
- Currency: USD for costs.
- Database: Relational (SQL).
- Users must authenticate for protected endpoints.
- Swagger UI accessible at `/swagger`.
- Rate limiting: 100 requests per minute per IP (configurable).
- Caching: 5-minute TTL for GET responses.
- Background Jobs: Daily check for due maintenance and send emails/push.
- Predictive Maintenance: Binary classification (needs maintenance soon: yes/no) using ML.NET; assumes historical data in DB for training (or sample CSV); model trained offline, loaded in API.
- Mobile App: Flutter app communicates with API; built separately, distributed via app stores or Firebase App Distribution.

## 2. Repository Design Pattern

No changes; same as before.

## 3. Implement DB using EF Core

No changes; same as before.

## 4. EERD & Mapping

No changes.

## 5. All Features

### 5.1 Project Structure
Updated with `mobile` folder for Flutter app.

```
CarMaintenanceApi/
├── mobile/  // Flutter app
│   ├── lib/
│   │   ├── screens/
│   │   │   ├── login_screen.dart
│   │   │   ├── register_screen.dart
│   │   │   ├── dashboard_screen.dart
│   │   │   ├── car_list_screen.dart
│   │   │   ├── car_form_screen.dart
│   │   │   ├── maintenance_list_screen.dart
│   │   │   ├── chat_screen.dart
│   │   │   ├── prediction_screen.dart
│   │   ├── services/
│   │   │   ├── auth_service.dart
│   │   │   ├── car_service.dart
│   │   │   ├── signalr_service.dart
│   │   │   ├── predictive_service.dart
│   │   ├── models/
│   │   │   ├── car_model.dart
│   │   ├── main.dart
│   ├── pubspec.yaml
│   ├── android/
│   ├── ios/
├── Controllers/
│   ├── AuthController.cs
│   ├── CarsController.cs
│   ├── OwnersController.cs
│   ├── MaintenanceRecordsController.cs
│   ├── ServiceTypesController.cs
│   ├── NotificationsController.cs
├── Hubs/
│   ├── ChatHub.cs
├── Data/
│   └── AppDbContext.cs
├── Interfaces/
│   ├── IRepository.cs
│   ├── IUnitOfWork.cs
│   ├── IAuthService.cs
│   ├── INotificationService.cs
│   ├── IPredictiveMaintenanceService.cs
├── Models/
│   ├── AppUser.cs
│   ├── Car.cs
│   ├── Owner.cs
│   ├── MaintenanceRecord.cs
│   ├── ServiceType.cs
│   ├── ChatMessage.cs
├── DTOs/
│   ├── CarDto.cs
│   ├── OwnerDto.cs
│   ├── MaintenanceRecordDto.cs
│   ├── ServiceTypeDto.cs
│   ├── LoginDto.cs
│   ├── RegisterDto.cs
│   ├── TokenDto.cs
│   ├── ChatMessageDto.cs
│   ├── NotificationDto.cs
├── Repositories/
│   ├── Repository.cs
│   ├── UnitOfWork.cs
├── Services/
│   ├── AuthService.cs
│   ├── CarService.cs
│   ├── NotificationService.cs
│   ├── PredictiveMaintenanceService.cs
├── Profiles/
│   └── MappingProfile.cs
├── Resources/
│   ├── AppResources.resx
│   ├── AppResources.es.resx
├── .github/workflows/
│   └── ci-cd.yml
├── Dockerfile
├── docker-compose.yml
├── Program.cs
├── appsettings.json
└── CarMaintenanceApi.csproj
```

### 5.2 Services Layer
No changes to backend services.

For Flutter services, see section 10.

### 5.3 DTOs
No changes; Flutter uses similar models in Dart.

### 5.4 Configuration
No changes to backend; remove Angular-specific static file serving (since Flutter is separate).

### 5.5 Controllers
No changes; Flutter app calls them via HTTP.

### 5.6 Live Chat with SignalR
Flutter uses `signalr_netcore` package.

### 5.7 Localization
Backend as before; Flutter uses `flutter_localizations` for i18n.

### 5.8 Docker Containerization
No changes; Flutter app is built separately, not containerized with API.

### 5.9 Enhanced Features
- **Push Notifications**: Add Firebase Cloud Messaging (FCM) for push notifications in Flutter.

Add to `pubspec.yaml`:
```yaml
dependencies:
  firebase_core: ^3.6.0
  firebase_messaging: ^15.1.3
```

## 6. Deployment and Best Practices
- Backend: Deploy as container to Azure App Service.
- Flutter: Build APKs/iOS apps, distribute via stores or Firebase App Distribution.
- For ML: Retrain model periodically via background job; use batch predictions.
- Security: Use HTTPS, secure storage for tokens.

## 7. Unit Testing Guide
Add Flutter tests with `flutter test`.

## 8. API Documentation with Swagger
No changes; Flutter doesn't affect.

## 9. CI/CD Pipeline with GitHub Actions
Update to build Flutter app.

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-api:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '8.0.x'

    - name: Restore dependencies
      run: dotnet restore

    - name: Build
      run: dotnet build --configuration Release --no-restore

    - name: Run tests
      run: dotnet test --no-build --verbosity normal

  build-flutter:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Flutter
      uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.24.x'
        channel: 'stable'

    - name: Install dependencies
      working-directory: mobile
      run: flutter pub get

    - name: Run tests
      working-directory: mobile
      run: flutter test

    - name: Build APK
      working-directory: mobile
      run: flutter build apk --release

    - name: Upload APK
      uses: actions/upload-artifact@v3
      with:
        name: app-release.apk
        path: mobile/build/app/outputs/flutter-apk/app-release.apk

  deploy-api:
    runs-on: ubuntu-latest
    needs: [build-api]
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
    - uses: actions/checkout@v3

    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '8.0.x'

    - name: Restore dependencies
      run: dotnet restore

    - name: Build
      run: dotnet build --configuration Release --no-restore

    - name: Publish
      run: dotnet publish --configuration Release --output ./publish

    - name: Login to Azure Container Registry
      uses: azure/docker-login@v1
      with:
        login-server: ${{ secrets.AZURE_ACR_REGISTRY }}
        username: ${{ secrets.AZURE_ACR_USERNAME }}
        password: ${{ secrets.AZURE_ACR_PASSWORD }}

    - name: Build and push Docker image
      run: |
        docker build . -t ${{ secrets.AZURE_ACR_REGISTRY }}/carmaintenanceapi:${{ github.sha }}
        docker push ${{ secrets.AZURE_ACR_REGISTRY }}/carmaintenanceapi:${{ github.sha }}

    - name: Deploy to Azure App Service
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'your-app-name'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        images: '${{ secrets.AZURE_ACR_REGISTRY }}/carmaintenanceapi:${{ github.sha }}'
```

Add secrets for FCM if using Firebase App Distribution.

## 10. Mobile App with Flutter

The mobile app is a Flutter 3.24 app in the `mobile` folder, built for iOS/Android.

### 10.1 Setup
- Install Flutter SDK: Follow flutter.dev.
- Create app: `flutter create mobile`.
- Add packages in `pubspec.yaml`:
```yaml
dependencies:
  flutter:
    sdk: flutter
  dio: ^5.7.0
  flutter_secure_storage: ^9.2.2
  signalr_netcore: ^3.0.2
  flutter_localizations:
    sdk: flutter
  provider: ^6.1.2
  firebase_core: ^3.6.0
  firebase_messaging: ^15.1.3
```

### 10.2 Structure
As in 5.1.

### 10.3 Key Code Snippets

#### main.dart
```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:firebase_core/firebase_core.dart';
import 'services/auth_service.dart';
import 'screens/login_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthService()),
        // Other providers
      ],
      child: MaterialApp(
        localizationsDelegates: [
          GlobalMaterialLocalizations.delegate,
          GlobalWidgetsLocalizations.delegate,
          GlobalCupertinoLocalizations.delegate,
        ],
        supportedLocales: [Locale('en'), Locale('es')],
        home: LoginScreen(),
        routes: {
          '/dashboard': (_) => DashboardScreen(),
          // Other routes
        },
      ),
    );
  }
}
```

#### auth_service.dart
```dart
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthService with ChangeNotifier {
  final Dio _dio = Dio();
  final _storage = FlutterSecureStorage();
  final String _baseUrl = 'https://your-api.com/api/auth';
  String? _token;

  String? get token => _token;

  Future<bool> login(String email, String password) async {
    try {
      final response = await _dio.post('$_baseUrl/login', data: {
        'email': email,
        'password': password,
      });
      _token = response.data['token'];
      await _storage.write(key: 'authToken', value: _token);
      notifyListeners();
      return true;
    } catch (e) {
      return false;
    }
  }

  Future<bool> register(String email, String password) async {
    try {
      final response = await _dio.post('$_baseUrl/register', data: {
        'email': email,
        'password': password,
      });
      _token = response.data['token'];
      await _storage.write(key: 'authToken', value: _token);
      notifyListeners();
      return true;
    } catch (e) {
      return false;
    }
  }

  Future<void> logout() async {
    _token = null;
    await _storage.delete(key: 'authToken');
    notifyListeners();
  }

  Future<bool> isLoggedIn() async {
    _token = await _storage.read(key: 'authToken');
    return _token != null;
  }
}
```

#### car_service.dart
```dart
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class CarService {
  final Dio _dio = Dio();
  final _storage = FlutterSecureStorage();
  final String _baseUrl = 'https://your-api.com/api/v1/cars';

  CarService() {
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await _storage.read(key: 'authToken');
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        handler.next(options);
      },
    ));
  }

  Future<List<dynamic>> getAll() async {
    final response = await _dio.get(_baseUrl);
    return response.data;
  }

  Future<bool> getPrediction(int carId) async {
    final response = await _dio.get('$_baseUrl/$carId/prediction');
    return response.data;
  }

  // Add create, update, delete
}
```

#### chat_screen.dart
```dart
import 'package:flutter/material.dart';
import 'package:signalr_netcore/hub_connection_builder.dart';

class ChatScreen extends StatefulWidget {
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final hubConnection = HubConnectionBuilder()
      .withUrl('https://your-api.com/chatHub', options: HttpConnectionOptions(
        accessTokenFactory: () async => await FlutterSecureStorage().read(key: 'authToken'),
      ))
      .build();
  List<String> messages = [];

  @override
  void initState() {
    super.initState();
    hubConnection.on('ReceiveMessage', (args) {
      setState(() {
        messages.add('${args[0]}: ${args[1]}');
      });
    });
    hubConnection.start();
  }

  void sendMessage(String receiverId, String message) {
    hubConnection.invoke('SendMessage', args: [receiverId, message]);
  }

  @override
  Widget build(BuildContext context) {
    // Build UI with ListView for messages, TextField for input
    return Scaffold(
      appBar: AppBar(title: Text('Chat')),
      body: Column(
        children: [
          Expanded(child: ListView.builder(
            itemCount: messages.length,
            itemBuilder: (_, index) => ListTile(title: Text(messages[index])),
          )),
          TextField(
            onSubmitted: (value) => sendMessage('receiverId', value),
          ),
        ],
      ),
    );
  }
}
```

### 10.4 Additional Mobile Features
- UI: Use Material 3 for modern design.
- State: Provider for simple state management.
- Notifications: FCM for push notifications.
- Localization: `flutter_localizations` with .arb files for translations.
- Predictions: Display in a card with explanation.

## 11. Unit Testing Guide
Example for AuthService:
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:dio/dio.dart';
import 'services/auth_service.dart';

class MockDio extends Mock implements Dio {}

void main() {
  test('login sets token', () async {
    final mockDio = MockDio();
    final service = AuthService();
    when(mockDio.post(any, data: anyNamed('data')))
        .thenAnswer((_) async => Response(data: {'token': 'fake-token'}, requestOptions: RequestOptions(path: '')));

    final result = await service.login('test@example.com', 'pass');
    expect(result, true);
    expect(service.token, 'fake-token');
  });
}
```

## 12. Deployment and Best Practices
- Flutter: Optimize with `--release`, use code splitting.
- Push Notifications: Configure FCM in Firebase Console.

This is the full updated documentation. Test the Flutter app with `flutter run` and API with Docker. Expand as needed!