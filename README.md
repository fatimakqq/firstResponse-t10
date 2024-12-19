# FirstResponse 🚑
FirstResponse is a tool that allows Emergency Medical Technicians to keep track of and respond to emergencies efficiently.

## The Devs

Fatima Khalid

Faris Kazi

Rudra Amin

## Run FirstResponse

### To quickly run as a website, run the following commands in a terminal:

npm install (for first time)

npm run dev

This will be sufficient if you just want to view the app as a web app in your browser at localhost:3000. However, we have designed FirstResponse to be ideal for iPhone, so we recommend you continue run instructions to get it as a mobile app:

### To run on your iOS mobile device or mobile emulator, open a second terminal:

npm run build

npx cap sync ios

npx cap copy ios

cd ios/App

pod install (for first time)

open App.xcworkspace or npx cap open ios

This will open the app in Xcode, allowing you to connect your device and run the app on iOS. 

### Running an app on a phone or emulator:
At this stage, the project will automatically open on Xcode. Select a device from the top left menu. We recommend iPhone 12 emulator, but any emulator should do.

You can even connect your own iPhone to the computer via cable and select it from the same menu! Just make sure your phone is in Developer Mode (Settings > Privacy and Security > Developer Mode ON).

## Using the UI

Watch our Youtube Video Walkthrough for a quick tour of EMT tasks: 🎥
https://youtu.be/2QmVPgZzvII

Note: to sign into the app, any email address and any password should do. We do not have backend authentication securely set up.



