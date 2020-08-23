import React from 'react';
import './ProfileImage.scss';
import { IonAvatar } from '@ionic/react';

function ProfileImage(props) {
    const imageLink = 'https://i.pinimg.com/originals/2a/09/d4/2a09d44a0e2bb8b505b15bca5f4122bf.png';
    return (
        <IonAvatar {...props}>
            <img alt="profile" src={imageLink}></img>
        </IonAvatar>
    );
}

export default ProfileImage;
