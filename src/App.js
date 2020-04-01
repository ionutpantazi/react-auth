import React from "react";
import firebase from "firebase/app";
import LoginPage from "./componente/LoginPage";
import Anonymous from "./componente/Anonymous";
import Authenticated from "./componente/Authenticated";
import "firebase/auth";
import "firebase/database";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { config } from "./config";


class App extends React.Component {
  render() {
    return (
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <FirebaseAuthConsumer>
          {({ isSignedIn }) => {
            if (isSignedIn === false) {
              return (
                <div>
                  <LoginPage />
                </div>
              )
            }
          }}
        </FirebaseAuthConsumer>
        <IfFirebaseAuthedAnd
          filter={({ providerId }) => {
            return (
              providerId !== "anonymous"
            );
          }}
        >
          {({ user }) => {
            return (
              <Authenticated user={user.email} />
            );
          }}
        </IfFirebaseAuthedAnd>
        <IfFirebaseAuthedAnd
          filter={({ providerId }) => {
            return (
              providerId == "anonymous"
            );
          }}
        >
          {() => {
            return (
              <Anonymous />
            );
          }}
        </IfFirebaseAuthedAnd>
      </FirebaseAuthProvider>
    );
  };
};

export default App