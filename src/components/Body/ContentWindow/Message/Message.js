import React from 'react';
import './Message.scss';
import { IonItem, IonLabel } from '@ionic/react';

function Message(props) {
    // <div className={`message-container message-${props.messageType}`}>
    // <p className={`message-status has-text-weight-light`}>{props.messageStatus}</p>
    return (
        <IonItem>
            <IonLabel>
                <h2>{props.messageName}</h2>
                <p>{props.messageText}</p>
            </IonLabel>
        </IonItem>
    );
}

export default Message;
