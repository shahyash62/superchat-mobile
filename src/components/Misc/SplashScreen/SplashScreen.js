import React from 'react';
import { IonPage } from '@ionic/react';
import theme from './SplashScreen.module.scss';

function SplashScreen() {
    return (
        <IonPage>
            <div className={theme.splash_screen}>
                <div className={theme.spinner}></div>
            </div>
        </IonPage>
    );
}

export default SplashScreen;
