import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../config/clientApp';

const uiConfig = {
    signInSuccessUrl: "/",
    signInOptions: [
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
}

function Auth() {
    return (
        <div
            style={{
                maxWidth: "320px",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                justifyContent: "center",
            }}
        >
            <h1>NextJS Firebase Linkage Learning WebApp</h1>
            <p>Please SignIn: </p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )
}

export default Auth;