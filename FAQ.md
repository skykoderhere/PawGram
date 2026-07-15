# Frequently Asked Questions (FAQ)

### Can I use PawGram alongside the official Instagram app?
Yes. PawGram is built as a clone. We manually modify the package name (`paw.instagram.android`), which isolates its data and installation from the official app. You can safely run both on the same device.

### I'm seeing an "App is outdated" popup. What do I do?
You shouldn't! PawGram includes a specific modification that bypasses the base outdated popup. If you are seeing this, ensure you have downloaded the latest OTA update via our in-app updater.

### How do I access the hidden Alpha features?
PawGram unlocks Instagram's Developer Options by default. To easily enable features, you can drop our readymade `mc_overrides.json` file into `/paw.instagram.android/data/files/metaconfig/`. Please refer to `dev/ConfigApplyGuide.md` for full instructions.

### Why do some emojis look different?
We replaced the default Android `IGBetaUIv9_Regular.ttf` with custom iOS Emojis. This gives PawGram a native, clean Apple emoji experience across the timeline and direct messages.

### Will I get banned for using this?
PawGram focuses exclusively on client-side UI modifications (AMOLED theming, ad-blocking, layout refinements). We do not provide features that spam the API or automate actions. However, using any modified client always carries a theoretical risk. Use at your own discretion.
