<img src="./readme/title1.svg"/>

<div align="center">

> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available.

**[PROJECT PHILOSOPHY](https://github.com/julescript/well_app#-project-philosophy) • [WIREFRAMES](https://github.com/julescript/well_app#-wireframes) • [TECH STACK](https://github.com/julescript/well_app#-tech-stack) • [IMPLEMENTATION](https://github.com/julescript/well_app#-impplementation) • [HOW TO RUN?](https://github.com/julescript/well_app#-how-to-run)**

</div>

<br><br>

<img src="./readme/title2.svg"/>

> Tracker Application is a car tracker application with a real time GPS tracking system for vehicles, that alert the users if their cars is being robbed
>
> Whenever the car is active a push notification is sent to the users alerting them that their cars is moving now,and can track the car to see its path.

### User Stories

- As a User, I wants to locate my car, So that I find it faster.
- As a User, I wants to track my car any time, So I can know if it is being robbed.
- As a User, I wants to get notification if my car is active, So I can know if it is being robbed.
- As a User, I want to see the path of my car if it has been robbed, So i can find it easily.

<br><br>

<img src="./readme/title3.svg"/>

> This design was planned before on paper, then moved to Figma app for the fine details.
> Note that i didn't use any styling library or theme, all from scratch and using pure css modules

| Landing                                     | Login                                      | Register                                     |
| ------------------------------------------- | ------------------------------------------ | -------------------------------------------- |
| <img src="./readme/landing.png" width=190/> | <img src="./readme/login.png" width=190 /> | <img src="./readme/register.png" width=190/> |

| Map Screen                                    | Settings Screen                              | Settings Popup                            |
| --------------------------------------------- | -------------------------------------------- | ----------------------------------------- |
| <img src="./readme/mapScreen.png" width=185/> | <img src="./readme/settings.png" width=185/> | <img src="./readme/settings-popup.png" /> |

<br><br>

<img src="./readme/title4.svg"/>

Here's a brief high-level overview of the tech stack the Well app uses:

- Frontend: This project uses the [React Native Framework](https://reactnative.dev/). React native is an open-source JavaScript framework, designed for building apps on multiple platforms like iOS, Android, and also web applications, utilizing the very same code base. It is based on React, and it brings all its glory to mobile app development.
- Backend: The backend is implemented using [Laravel](https://laravel.com/) which is a free and open-source PHP web framework, intended for the development of web applications following the model–view–controller (MVC) architectural pattern and based on Symfony.
  -Admin: the admin panel is implemented using [React](https://reactjs.org/) which is a JavaScript library for building user interfaces.
- For persistent storage (database), the app uses [MySQL](https://www.mysql.com/) for users and [Firebase](https://firebase.google.com/) for Notifications and car location. MySQL is a relational database management system based on SQL – Structured Query Language. Google Firebase is a Google-backed application development software that enables developers to develop iOS, Android and Web apps. Firebase provides tools for tracking analytics, reporting and fixing app crashes, creating marketing and product experiment.
- To send local push notifications, the app uses the [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) package which provides an API to fetch push notification tokens and to present, schedule, receive and respond to notifications.
- For displaying maps and allowing users to see their car's location, the app uses [react-native-maps](https://github.com/react-native-maps/react-native-maps) which is a component system for maps that ships with platform-native code that needs to be compiled together with React Native.
- For Hardware the app uses [Arduino UNO](https://store-usa.arduino.cc/products/arduino-uno-rev3?selectedStore=us) and [GPS Module](https://randomnerdtutorials.com/guide-to-neo-6m-gps-module-with-arduino/) to help implement the live location built with this application.

<br><br>
<img src="./readme/title5.svg"/>

> Using the above mentioned tech stacks and the wireframes build with figma from the user sorties we have, the implementation of the app is shown as below, these are screenshots from the real app

| Landing                                | Login                                | Register                                |
| -------------------------------------- | ------------------------------------ | --------------------------------------- |
| <img src="./readme/real-landing.png"/> | <img src="./readme/real-login.png"/> | <img src="./readme/real-register.png"/> |

| Map Screen                          | Notification Screen                                | Notifications                                |
| ----------------------------------- | -------------------------------------------------- | -------------------------------------------- |
| <img src="./readme/real-map.png" /> | <img src="./readme/real-notification-screen.png"/> | <img src="./readme/real-notifications.png"/> |

| Profile Screen                         | Edit Profile                                | Add Car                                    |
| -------------------------------------- | ------------------------------------------- | ------------------------------------------ |
| <img src="./readme/real-profile.png"/> | <img src="./readme/real-edit-profile.png"/> | <img src="./readme/real-add-vehicle.png"/> |

| Edit Car                                 | Settings                                 | Settings/Popup                                 |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------------- |
| <img src="./readme/real-edit-car.png" /> | <img src="./readme/real-settings.png" /> | <img src="./readme/real-settings-popup.png" /> |

<br><br>
<img src="./readme/title6.svg"/>

> To get a local copy and run the application follow these simple steps:

### Prerequisites

- Download and Install [Node.js](https://nodejs.org/en/)
- Download and Install [Composer](https://getcomposer.org/)
- Download and Install [XAMPP](https://www.apachefriends.org/)

- npm
  ```sh
  npm install npm@latest -g
  ```
- Expo CLI
  ```sh
  npm install --global expo-cli
  ```
- Expo Go app for iOS and Android
  <br> _[Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) - Android Lollipop (5) and greater._
  <br> _[iOS App Store](https://apps.apple.com/app/expo-go/id982107779) - iOS 11 and greater._

- [Android Studio](https://developer.android.com/) or [BlueStacks](bluestacks.com) or any tool that run an emulator on your PC.
  <br>(or run it on web browser)

### Installation

- Clone the repo
  ```sh
  git clone https://github.com/malakshaer/tracker.git
  ```

### To Run frontend mobile application

1. Navigate to the Frontend folder then ReactNative folder and install dependencies
   ```sh
   cd tracker/frontend
   npm install
   ```
2. Run the start up command
   ```sh
   npm start
   ```

### To Run Laravel Server on your machine

1. Create a database locally named tracker_db
2. Navigate to the backend folder
   ```sh
   cd tracker/backend
   ```
3. Inside the .env file in your backend folder insert the db name as follows
   <br> _DB_DATABASE=tracker_db_

4. Run migration
   ```sh
   php artisan migrate
   ```
5. Start the Server
   ```sh
   php artisan serve
   ```
