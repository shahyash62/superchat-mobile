import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { signUp, login, refreshTokenAndLogin } from '../../StateManagement/User/UserActions';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonInput, IonButton, IonText } from '@ionic/react';
import SplashScreen from '../Misc/SplashScreen/SplashScreen';

const LandingForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        props.refreshTokenAndLogin(username, password).then((loginRes) => {
            console.log('refreshtoken log: ', loginRes);
            if (loginRes) setShowSplashScreen(false);
        });
        return () => {
            setShowSplashScreen(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowSplashScreen(true);
        const loginRes = await props.login(username, password);
        if (loginRes) setError(loginRes);
        setShowSplashScreen(false);
    };

    return showSplashScreen ? (
        <SplashScreen />
    ) : (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-padding">{'SuperChat :)'}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonInput value={username} placeholder="Username" onIonChange={(e) => setUsername(e.detail.value)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput type="password" value={password} placeholder="Password" onIonChange={(e) => setPassword(e.detail.value)}></IonInput>
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
    refreshTokenAndLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingForm);
