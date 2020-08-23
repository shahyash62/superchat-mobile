import React from 'react';
import { IonLabel } from '@ionic/react';

function GroupItemInfo(props) {
    console.log('GroupItemInfo Props: ', props);
    return (
        <IonLabel>
            <h2>{props.groupName}</h2>
            <p>{props.displayMessage}</p>
        </IonLabel>
    );
}

export default GroupItemInfo;
