# Letting your AI assistant control your computer ("computer use")

Some AI assistants (for example, Claude with its desktop app / computer use feature) can go beyond writing code — they can actually see your screen and control your mouse/keyboard to install software, click through setup wizards, run and test the app, and fix problems they see, instead of just giving you instructions to follow yourself.

**This is strongly recommended if your AI assistant supports it**, especially for non-coders, because:
- Installing SDKs (Flutter, Android Studio, Node.js, etc.) involves a lot of fiddly setup steps that are easy to get wrong by hand.
- The assistant can actually *see* the running app and verify it works, rather than guessing from your description.
- You don't need to understand the terminal commands yourself.

## How to check if your assistant supports it

Ask your assistant directly: **"Do you have computer use / desktop control available in this session?"**

- If it's **Claude** in the Claude desktop app: look for "computer use" tools being available (your assistant can check this itself — it should say so). This may need to be enabled in settings first.
- If it's a different assistant/tool: check that tool's documentation for "computer use", "desktop control", "agent mode", or similar.

## If computer use is available

Tell your assistant: *"You have computer use access — please use it to set up and build this project yourself where possible, instead of just giving me commands to run."*

Let it:
- Download and run installers for Flutter/Android Studio/Node.js/etc.
- Click through setup wizards
- Open and test the running app
- Take screenshots to confirm things look right

You should still keep an eye on what it's doing, especially around anything involving payments, account creation, or entering personal information — your assistant should always ask before doing anything like that.

## If computer use is NOT available

That's fine — just proceed with the normal copy-paste-commands workflow described in the other guides in this `docs/` folder. It'll take a bit more back-and-forth (your assistant tells you a command, you run it, you paste back the result), but gets you to the same place.
