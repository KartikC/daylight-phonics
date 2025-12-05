---
description: How to deploy the Phonics Soundboard to Web (Vercel), Android, and iOS
---

# Deployment Guide

This guide covers how to deploy the Phonics Soundboard application to the web using Vercel, and how to build for Android and iOS without incurring monthly costs.

## 1. Web Deployment (Vercel)

We use Vercel for hosting the web version. It's free for hobby projects and integrates well with Expo.

### Initial Setup (One-time)
1.  Push your code to a GitHub repository.
2.  Log in to [Vercel](https://vercel.com) and click "Add New Project".
3.  Import your GitHub repository.
4.  **Important**: In the "Build and Output Settings":
    -   **Framework Preset**: Select `Other` (or leave default if `Expo` isn't an option, but `Other` is safer).
    -   **Build Command**: `npm run build:web` (This runs `expo export --platform web`)
    -   **Output Directory**: `dist`
5.  Click "Deploy".

### Updating the Web App
Simply push your changes to the `main` branch on GitHub. Vercel will automatically trigger a new build and deployment.

## 2. Android Deployment (APK/AAB)

You can build the Android app locally for free.

### Prerequisites
-   Android Studio installed and configured.
-   Java Development Kit (JDK) installed.

### Steps
1.  **Development Build** (for testing on device):
    ```bash
    npx expo run:android
    ```
    This builds the app and installs it on your connected Android device or emulator.

2.  **Production Build** (APK for distribution):
    To generate an APK/AAB for the Play Store or manual installation, you can use EAS Build (Free Tier) or build locally using `eas build --local`.

    **Using EAS Build (Free Tier):**
    ```bash
    npm install -g eas-cli
    eas login
    eas build -p android --profile production
    ```
    *Note: The free tier has a queue, so it might take some time.*

    **Building Locally (No Queue):**
    ```bash
    eas build -p android --profile production --local
    ```
    *Note: This requires Docker or a properly configured Android environment.*

## 3. iOS Deployment (IPA)

Building for iOS requires a Mac.

### Prerequisites
-   Xcode installed.
-   CocoaPods installed.

### Steps
1.  **Development Build** (for testing on Simulator/Device):
    ```bash
    npx expo run:ios
    ```
    This builds the app and installs it on your iOS Simulator or connected device.

2.  **Production Build** (IPA for App Store/TestFlight):
    Similar to Android, you can use EAS Build (Free Tier) or build locally.

    **Using EAS Build (Free Tier):**
    ```bash
    eas build -p ios --profile production
    ```

    **Building Locally (No Queue):**
    ```bash
    eas build -p ios --profile production --local
    ```
