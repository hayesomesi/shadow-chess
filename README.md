# Calculator Android APK

A simple offline calculator packaged as a real Android app with Capacitor. GitHub Actions builds an installable **debug APK** automatically.

## Build the APK using GitHub (phone-friendly)

1. Extract this ZIP.
2. Open **github.com** and sign in.
3. Tap **New repository**. Name it `calculator-apk`. Set it to **Public** or **Private**, then create it.
4. In the new repository, choose **Add file → Upload files**.
5. Upload the *contents* of this folder (not the outer ZIP). Make sure `.github/workflows/build-apk.yml` is included. If `.github` is hidden by your file picker, use GitHub's web editor to create the workflow file at that exact path.
6. Commit the uploaded files to the `main` branch.
7. Open the repository's **Actions** tab. Select **Build Android APK**. If asked, enable GitHub Actions.
8. Wait for the workflow to finish with a green check mark.
9. Open the completed workflow run, scroll to **Artifacts**, and download `Calculator-debug-APK`.
10. Extract the downloaded artifact ZIP. Inside is `app-debug.apk`. Tap it on your Android phone to install. Android may ask you to allow installation from that source.

## Important

- This workflow creates a genuine Android **debug APK** (`app-debug.apk`) that can be installed on a compatible Android phone. It is not a Play Store release-signed APK.
- No Vercel account is needed to build the APK. GitHub Actions does the Android build in the cloud.
- The calculator works offline and does not request internet, contacts, location, or other sensitive permissions.
- To make a new APK after changing the app, commit the changes to `main` and the workflow runs again.
