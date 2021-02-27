import React from "react";
import db, { auth, provider } from "../firebase";
import { userFailLogin, userSuccessLogin } from "../redux/actions";
import store from "../redux/store";
import "./Login.css";

// Firebase user register

const Login = () => {
  const initialState = store.getState();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        db.collection("users").doc(result.user.providerData[0].uid).set({
          name: result.user.providerData[0].displayName,
          email: result.user.providerData[0].email,
          photoURL: result.user.providerData[0].photoURL,
          uid: result.user.providerData[0].uid,
        });
        store.dispatch(userSuccessLogin(result.user));
      })
      .catch((error) => {
        alert(error.message);

        store.dispatch(userFailLogin());
      });
  };

  // Main function
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login_text">
          <h1>Sign In to Chat App</h1>
        </div>
        <button onClick={signIn}>Sign In with Google</button>
      </div>
    </div>
  );
};

export default Login;
