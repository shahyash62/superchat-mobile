import React from 'react';
import theme from './Message.module.scss';
import { IonItem, IonLabel } from '@ionic/react';

function Message(props) {
    const ionLabelProps = {};
    const ionLabelH2Props = {};
    if (props.messageType === 'sent') {
        ionLabelProps.className = 'ion-text-end';
        ionLabelH2Props.className = 'sent';
    }
    return (
        <IonItem>
            <IonLabel {...ionLabelProps}>
                <h2 className={theme[ionLabelH2Props.className]}>{props.messageName}</h2>
                <p className={theme.message}>{props.messageText}</p>
            </IonLabel>
        </IonItem>
    );
}

export default Message;
