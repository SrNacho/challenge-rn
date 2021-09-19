# Challenge

## Application Setup (Windows/iOS)
#### Windows
```python
#Clone this repo
$ git clone https://github.com/SrNacho/challenge-rn.git
$ cd challenge-rn

#Download dependencies
$ npm install

#Running the app
$ npx react-native run-android
```
#### iOS
```python
#Clone this repo
$ git clone https://github.com/SrNacho/challenge-rn.git
$ cd challenge-rn
$ cd ios
$ pod install

#Download dependencies
$ npm install

#Running the app
$ npx react-native run-ios
```
**For more information about install, check the [React Native installing documentation](https://reactnative.dev/docs/environment-setup)

[Instalation on Windows/Android and showcase](https://youtu.be/2cYZFeXrkT0) <br>
[iOS showcase](https://youtu.be/DIW0o6FpQjA)

## Dependencies used

```json
{
  "@react-native-async-storage/async-storage": "^1.15.7",
  "@react-native-community/datetimepicker": "^3.5.2",
  "@react-native-community/masked-view": "^0.1.11",
  "@react-native-picker/picker": "^2.0.0",
  "@react-navigation/native": "^6.0.2",
  "@react-navigation/stack": "^6.0.7",
  "patch-package": "^6.4.7",
  "react": "17.0.2",
  "react-native": "0.65.1",
  "react-native-bouncy-checkbox": "^2.1.4",
  "react-native-dropdown-picker": "^5.1.23",
  "react-native-elements": "^3.4.2",
  "react-native-gesture-handler": "^1.10.3",
  "react-native-get-random-values": "^1.7.0",
  "react-native-modal-datetime-picker": "^11.0.0",
  "react-native-reanimated": "^2.3.0-alpha.2",
  "react-native-safe-area-context": "^3.3.2",
  "react-native-screens": "^3.6.0",
  "styled-components": "^5.3.1",
  "uuid": "^8.3.2"
}
```

# Scaling

Aplication actually can be used by thousands of users. Database is stored locally so multiple users can use it without affecting others information. <br>
**Also** if you want to scale it, you should add features such as:

- Task removal
- Mark as favourite
- Search for a task
- Sync with Google and a non-locally database, so users can see their tasks in any device
