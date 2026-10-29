# Building a Mobile App (Android / iPhone)

**Instructions for the AI assistant:** Only follow this path if the user has confirmed they specifically need an installable mobile app (not just "something on my phone" — a PWA from the [`website/`](../website/README.md) path can be installed to a phone's home screen too, and is much simpler).

## 1. Confirm this is really needed

Before starting, double check with the user: do they need native phone features (camera, push notifications, Bluetooth, background location, app store presence) that a website genuinely can't provide? If not, suggest the PWA route in [`website/README.md`](../website/README.md) instead — it's faster to build and doesn't require app store review.

If they confirm they want a real mobile app, continue below.

## 2. Standard stack: Flutter

This template uses **Flutter** for all mobile apps, because one Flutter codebase builds for both Android and iOS. Don't use a different framework (React Native, native Swift/Kotlin, etc.) unless the user specifically asks for it — consistency across projects is the point of this template.

### Setup required (one-time, per computer)

See [`docs/flutter-android-studio-setup.md`](../docs/flutter-android-studio-setup.md) for full step-by-step instructions. In short:

1. Install **Flutter SDK**.
2. Install **Android Studio** (needed for the Android SDK, emulator, and build tools — even if the user only wants an iPhone app, Android Studio is usually still required for Flutter's tooling on Windows/Linux).
3. Run `flutter doctor` and resolve anything it flags.
4. If building for iPhone: this must be done on a Mac with Xcode installed (Apple requires this — there's no way around it without a Mac).

**If you (the AI assistant) have computer use / desktop control access**, use it to actually run the installers, click through the Android Studio setup wizard, and run `flutter doctor` yourself rather than just telling the user what to type. See [`docs/computer-use-setup.md`](../docs/computer-use-setup.md).

## 3. Suggested folder layout

```
mobile-app/
├── README.md     ← this file
└── app/           ← the actual `flutter create` project goes here
```

Run `flutter create app` inside `mobile-app/` to scaffold the project.

## 4. Database / backend

If the app needs to store data or have user accounts, use **[Supabase](../docs/supabase.md)** (free tier) — there's an official `supabase_flutter` package.

## 5. Getting it onto a real phone

- **Android:** Build an APK (`flutter build apk`) and install it directly on the user's phone for testing — no app store needed to just try it out. Publishing to the Play Store is a separate, optional step (requires a one-time $25 Google Play developer account) — only do this if the user explicitly asks to publish.
- **iPhone:** Requires a Mac + Xcode + an Apple Developer account ($99/year) to install on a real device or publish to the App Store. Testing in the iOS Simulator (Mac only) doesn't require the paid account.

## 6. Checklist before telling the user it's "done"

- [ ] `flutter doctor` shows no blocking errors
- [ ] App runs in an emulator or on a real device, and the user has seen it running
- [ ] If using Supabase: keys are stored safely, not hardcoded and committed to git
- [ ] User understands the difference between "installed for testing" and "published to an app store"
