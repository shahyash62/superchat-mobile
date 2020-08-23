import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sendContactReq } from '../../../StateManagement/User/UserActions';
import ProfilePagePendingRequests from './ProfilePagePendingRequests';
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';

function ProfilePageAddContactForm(props) {
    const [contactUsername, setcontactUsername] = useState('');
    const [response, setresponse] = useState({ pending: false, type: null, message: '' });
    async function sendContactReq() {
        setresponse({ pending: true, type: null, messgae: '' });
        const res = await props.sendContactReq(contactUsername);
        res.pending = false;
        setresponse(res);
    }
    return (
        <>
            <form>
                <IonItem>
                    <IonLabel>Add Contact:</IonLabel>
                    <IonInput
                        className="input"
                        type="text"
                        name="search"
                        id="search"
                        value={contactUsername}
                        onIonChange={(event) => {
                            setcontactUsername(event.target.value);
                            setresponse('');
                        }}
                    />
                    <IonButton className={`button is-primary ${response.pending ? 'is-loading' : ''}`} type="button" onClick={sendContactReq}>
                        Add
                    </IonButton>
                </IonItem>
                {response ? <p className={response.type !== 'error' ? 'ion-padding is-success' : 'ion-padding help error'}>{response.message}</p> : null}
            </form>
            <ProfilePagePendingRequests></ProfilePagePendingRequests>
        </>
    );
}

const mapDispatchToProps = {
    sendContactReq,
};

export default connect(null, mapDispatchToProps)(ProfilePageAddContactForm);
