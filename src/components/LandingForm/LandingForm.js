import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { signUp, login } from '../../StateManagement/User/UserActions';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonInput, IonButton, IonText, IonLabel } from '@ionic/react';

const LandingForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();
    // const localStorage = window.localStorage;
    // const token = localStorage.getItem('AuthKey');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginRes = await props.login(username, password);
        if (loginRes) setError(loginRes);
        else history.replace('/loggedin');
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-padding">{'Zen :)'}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonInput value={username} placeholder="Username" onIonChange={(e) => setUsername(e.detail.value)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput value={password} placeholder="Password" onIonChange={(e) => setPassword(e.detail.value)}></IonInput>
                </IonItem>
                <IonText>{error}</IonText>
                <IonButton expand="block" onClick={handleSubmit}>
                    Login
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

const mapStateToProps = (state) => {
    const { authorization } = state.userData;
    const newProps = {
        isAuthorizationPending: authorization.isAuthorizationPending,
        errorMessage: authorization.errorMessage,
    };
    console.log('LandingForm mapStateToProps: ', newProps);
    return newProps;
};

const mapDispatchToProps = {
    signUp,
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingForm);
