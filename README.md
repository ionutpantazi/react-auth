## Single-page authentication app based on Create-React-App and Firebase.
**This application is intended to provide a basic but still fully functional user login system**

Live demo available here: [https://ionutpantazi-react-auth.firebaseapp.com/](https://ionutpantazi-react-auth.firebaseapp.com/)
#### Features:
 - Login/Logout functionality (email, facebook, google and anonymous)
 - Register new users
 - Message dashboard
 - ANTD design implementation

#### Instructions:
 - git clone https://github.com/ionutpantazi/react-auth.git
 - create a new config file named **config.js** in **/src** folder and paste your own firebase config keys
 -  `npm install`
 -   `npm start`
 - development server will run on port 3000
#### Config.js example:
```
const firebaseConfig =  {  
	apiKey:  "<YOUR-API-KEY>",  
	authDomain:  "<YOUR-AUTH-DOMAIN>",  
	databaseURL:  "<YOUR-DATABASE-URL>",  
};
```
#### Project structure:
```
Landing page:
 - Sign in
 - Sign up
Authenticated users only page:
 - Messages dashboard
 - Authenticated users can post a message
```
  #### Dependencies:
```
 - "@react-firebase/auth": "^0.2.10",
 - "@react-firebase/database": "^0.3.11",
 - "antd": "^4.0.4",
 - "firebase": "^7.12.0",
