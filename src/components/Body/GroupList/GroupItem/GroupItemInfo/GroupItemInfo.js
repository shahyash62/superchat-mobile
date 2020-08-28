import React from 'react';
import { IonLabel, IonBadge } from '@ionic/react';

function GroupItemInfo(props) {
    console.log('GroupItemInfo Props: ', props);
    return (
        <>
            <IonLabel>
                <h2>{props.groupName}</h2>
                <p>{props.displayMessage}</p>
            </IonLabel>
            <IonBadge slot="end">{props.unread}</IonBadge>
        </>
    );
}

export default GroupItemInfo;
