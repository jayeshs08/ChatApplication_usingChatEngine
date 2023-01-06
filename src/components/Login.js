import React from 'react'
import { GoogleOutlined } from '@ant-design/icons/lib/icons';
import "firebase/app";
import { auth } from '../firebase';
import firebase from 'firebase/app';


const Login =() =>
{
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>THIS IS ARC CHAT</h2>
                <div className='login-button google' 
                onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined></GoogleOutlined>Sign in with Google
                </div>
            </div>
        </div>
    );


}
export default Login;