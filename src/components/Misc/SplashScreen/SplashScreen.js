import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import theme from './SplashScreen.module.scss';

function SplashScreen() {
    return (
        <IonPage>
            <IonContent>
                <div className={theme.splash_screen}>
                    <div className={theme.spinner}></div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default SplashScreen;
