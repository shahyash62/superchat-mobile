import React, { useState } from 'react';
import { connect } from 'react-redux';
import { acceptContactReq } from '../../../StateManagement/User/UserActions';
import { IonList, IonListHeader, IonItem, IonButton, IonButtons } from '@ionic/react';

function ProfilePagePendingRequests(props) {
    const { selectedProfile, receivedPendingContactReqList } = props;
    const [requestComplete, setrequestComplete] = useState(true);
    console.log(selectedProfile, requestComplete);
    async function sendAcceptContactReq(contactUsername) {
        setrequestComplete(false);
        await props.acceptContactReq(contactUsername);
        setrequestComplete(true);
    }
    return (
        <IonList>
            <IonListHeader htmlFor="" className="label">
                Received Requests
            </IonListHeader>

            {receivedPendingContactReqList.map((request) => {
                return (
                    <IonItem key={request.username}>
                        <p>{request.username}</p>
                        <IonButtons slot="end">
                            <IonButton className="button is-small">Ignore</IonButton>
                            <IonButton className="button is-small is-primary is-outlined" onClick={() => sendAcceptContactReq(request.username)}>
                                Accept
                            </IonButton>
                        </IonButtons>
                    </IonItem>
                );
            })}
        </IonList>
    );
}

const mapStateToProps = (state) => {
    const { selectedProfile, receivedPendingContactReqList } = state.userData;
    const newProps = {
        selectedProfile,
        receivedPendingContactReqList,
    };
    console.log('ProfilePagePendingRequests mappedProps: ', newProps);
    return newProps;
};

const mapDispatchToProps = {
    acceptContactReq,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePagePendingRequests);
