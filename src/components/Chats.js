import React, { useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () =>
{
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    //handling logout
    const handleLogout = async () =>
    {
        await auth.signOut();
        history.push('/');
    }

    //to get the userimage
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data],"userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(() =>{
        if(!user){
            history.push('/');
            return;
        }
        //if there are users, then fetch
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "77d7160b-e951-41ad-9ebb-b8a76e0b4512",
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
        .then(() => {
            setLoading(false);
        }) /*if no chat engine profile*/
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username', user.email);
            formdata.append('secret',user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users/', formdata, 
                    {headers : { "private-key": "845d0189-7195-4597-a346-459ad89fb8ce" }}
                    )
                    .then(()=> setLoading(false))
                    .catch((error)=> console.log(error))
                })
        })
    },[user, history]);

    if(!user || loading) return 'Loading ...'
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    ArcChat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
            height="calc(100vh - 66px)"
            projectID="77d7160b-e951-41ad-9ebb-b8a76e0b4512"
            userName={user.email}
            userSecret={user.uid}
            />
        </div>
    )
}
export default Chats;