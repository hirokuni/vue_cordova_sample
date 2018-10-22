# Vuejs and Cordova Test

## Introduction
setup with vue-cli-plugin-cordova. Just sample using the command for Android.

## Project setup
Ignore source code of this git repository. To create new app, follow next steps.
And please make application with using this git repository code as sample.
```
$ npm install -g @vue/cli
$ npm install -g @vue/cli-service-global
$ vue create camera-test

$ npm install -g cordova # If cordova is not already installed
$ cd camera-test
# cordova projectを作る
$ vue add cordova
# src-cordovaをcordova projectｎの作成先にした場合
$ cd src-cordova 
# Add android platform to cordova project
$ cordova platform add android
$ cd ..
```

### Compiles and hot-reloads for development
```
# start build and load vue application for Android
$ cd camera-test

### Android ###
$ npm run cordova-serve-android # Development Android
$ npm run cordova-build-android # Build Android
```
```
### IOS ###
$ npm run cordova-serve-ios # Development IOS
$ npm run cordova-build-ios # Build IOS
### BROWSER ###
$ npm run cordova-serve-browser # Development Browser
$ npm run cordova-build-browser # Build Browser
```


### Compiles and minifies for production
```
cordova-build-android
```

### Lints and fixes files
```
```
