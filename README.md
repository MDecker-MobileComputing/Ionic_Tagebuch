# Ionic app to demonstrate usage of a Capacitor plugin #

The repository contains an Ionic app for Android which is a very simple diary app.
All texts entered are written into a text file on the filesystem of the Android device,
for which the Capacitor plugin [filesystem](https://capacitorjs.com/docs/v3/apis/filesystem)
is used, see also [here](https://www.npmjs.com/package/@capacitor/filesystem).

<br>

----

## Adding the plugin ##

Update to capacitor 3.x if needed (see also [here](https://capacitorjs.com/docs/v3/updating/3-0)):
```
npm install @capacitor/cli@next @capacitor/core@next
```

<br>

Adding the plugin to the project:
```
npm install @capacitor/filesystem
npx cap sync
```

<br>

Get list of project's plugins:
```
npx cap ls android
```

<br>

----

## Entries needed in Manifest file of Android application ##

For using the plugin `filesystem` in the app the following things in the [Manifest file](android/app/src/main/AndroidManifest.xml) have to be changed:

Allowing access to folder `Documents` as of Android 10:
```
android:requestLegacyExternalStorage="true"
```

Declaring permission:
```
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

----

## License ##

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License) for the files in this repository.

<br>