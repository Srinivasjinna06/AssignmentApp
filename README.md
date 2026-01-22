# 📱 Cross-Platform WebView & HLS Video Player

A high-performance, cross-platform React Native application built with **Expo SDK 53**. This project demonstrates advanced handling of WebViews, native notifications, and HLS video streaming with a focus on modern UI/UX principles.

---

## 🚀 Key Features

### 1. Unified Notification System
* **Dual-Layer Feedback**: Implemented an immediate "Processing" Toast for instant user feedback, followed by the requested notification after a **2-5 second delay**.
* **Cross-Platform Toasts**: Utilized `react-native-toast-message` to ensure a consistent, non-blocking UI on Android, iOS, and Web.
* **Native Local Notifications**: Configured `expo-notifications` for mobile platforms to ensure system-level alerts trigger even when the app is in the background.

### 2. High-Performance WebView
* **Optimized Loading**: Integrated an `ActivityIndicator` and "Success" Toasts to keep the user informed during the site loading process.
* **Web Fallback Strategy**: Implemented a graceful fallback for the Web platform, providing a direct link to content since WebViews behave differently in browser environments.

### 3. Advanced HLS Video Player
* **Buffering Awareness**: Added a custom buffering overlay with an `ActivityIndicator` to prevent "user shock" during network fluctuations.
* **Native Controls**: Full support for Play, Pause, and Fullscreen modes.
* **HLS Integration**: Optimized for adaptive bitrate streaming using a test Mux HLS stream.

### 4. Modern UI & Animations
* **Component Library Influence**: Modeled the UI after **HeroUI** and **React Native Reusables** using custom-styled components for a professional feel.
* **Animated Transitions**: Used `react-native-reanimated` for smooth fade-in effects on the Video Player and Toast transitions.

---

## 🛠️ Tech Stack

* **Framework**: Expo (React Native)
* **Navigation**: Expo Router (File-based navigation)
* **Styling**: React Native StyleSheet (Focused on modern rounded-corner design)
* **Icons**: Ionicons (Vector Icons)
* **Notifications**: Expo Notifications & React Native Toast Message

---

## 📦 Implementation Choices

* **Toast vs. Alert**: Chose auto-hiding Toasts (3-second duration) over standard `alert()` boxes to ensure the UI remains non-blocking.
* **Buffering State**: Implemented a `statusChange` listener on the video player to detect loading states, ensuring the user is never left wondering why a video has paused.
* **Platform Branching**: Used `Platform.OS` logic to deliver native features to mobile users while maintaining a functional experience for web-based reviewers.

---

## ⚙️ Installation & Setup

1.  **Clone the repository**
2.  **Install dependencies**: 
    ```bash
    npx expo install
    ```
3.  **Start the app**: 
    ```bash
    npx expo start
    ```
4.  **Test on Mobile**: Scan the QR code with the **Expo Go** app (Android/iOS).
5.  **Test on Web**: Press `w` in the terminal to open the browser version.

---

## 🏆 Bonus Challenges Completed

* ✅ **Challenge 1**: Triggered a notification/toast once the WebView finishes loading.
* ✅ **Challenge 2**: Implemented notification data handling to prepare for tap-to-navigate functionality.
* ✅ **Challenge 3**: Added buffering indicators and loading overlays for the video player.
