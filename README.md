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

Adding the plugin to the project:
```
npm install @capacitor/filesystem
npx cap sync
```



<br>

----

## License ##

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License) for the files in this repository.

<br>