---
title: CI/CD and Deployment
description: GitHub Actions workflow for Azure deployment.
---

# CI/CD Pipeline

## 🧱 Workflow Overview
- Backend: Deploy to Azure App Service
- Frontend: Deploy to Azure Static Web Apps

## ⚙️ GitHub Actions YAML
```yaml
name: Build & Deploy AutoSphere

on:
  push:
    branches: [main]

jobs:
  build-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-dotnet@v3
        with: { dotnet-version: '8.0.x' }
      - run: dotnet publish src/AutoSphere.Api/AutoSphere.Api.csproj -c Release -o ./publish
      - uses: azure/webapps-deploy@v2
        with:
          app-name: 'autosphere-api'
          publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE_API }}
          package: ./publish

  build-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: 20 }
      - run: |
          cd frontend
          npm ci
          npm run build -- --configuration production
      - uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APP_TOKEN }}
          app_location: "frontend/dist"
```
