# Setting up Flutter + Android Studio

Needed before building anything in [`mobile-app/`](../mobile-app/README.md).

**If your AI assistant has computer-use / desktop control access**, ask it to run through this setup itself (downloading installers, clicking through the Android Studio wizard, running the commands below) rather than doing it manually. See [`computer-use-setup.md`](computer-use-setup.md).

## 1. Install Flutter SDK

- Go to [flutter.dev](https://docs.flutter.dev/get-started/install) and download the installer for your OS (Windows/Mac/Linux).
- Follow the official installer — it handles adding Flutter to your system PATH.

## 2. Install Android Studio

- Download from [developer.android.com/studio](https://developer.android.com/studio).
- Run the installer, choosing the **Standard** setup when prompted.
- This installs the Android SDK, platform tools, and an emulator — Flutter needs these even if you're not writing any Java/Kotlin code yourself.
- Open Android Studio once after installing, and let it finish downloading SDK components (it'll prompt you).

## 3. (iPhone only) Install Xcode — Mac required

- Apple only allows building/testing iOS apps on a Mac. Install **Xcode** from the Mac App Store.
- Open Xcode once to accept its license and let it install additional components.
- You'll also eventually need an Apple Developer account ($99/year) to install on a real iPhone or publish to the App Store — but you can test in the iOS Simulator for free.

## 4. Verify everything works

Open a terminal and run:

```bash
flutter doctor
```

This checks your setup and tells you exactly what (if anything) is still missing, with instructions to fix each issue. Resolve everything it flags with a ✗ or ! before continuing — this is the single most useful command for diagnosing Flutter setup problems.

## 5. Create your first project

```bash
flutter create app
cd app
flutter run
```

This should launch the default Flutter demo app in an emulator or connected device.
