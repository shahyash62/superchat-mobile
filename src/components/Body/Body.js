import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonButton, IonIcon, IonFooter, IonButtons } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import GroupList from './GroupList/GroupList';
import { changeProfileToBlue, changeProfileToRed, changeProfileToGreen } from '../../StateManagement/User/UserActions';
import theme from './Body.module.scss';

function Body(props) {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-padding">{'SuperChat :)'}</IonTitle>
                    <IonButton routerLink="/loggedin/settings" fill="clear" slot="end">
                        <IonIcon slot="icon-only" icon={settingsOutline} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <GroupList></GroupList>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButtons slot="primary">
                        <IonButton fill="clear" className={theme.transparent_tab_button} onClick={() => props.changeProfileToRed()}>
                            Red
                        </IonButton>
                        <IonButton fill="clear" className={theme.transparent_tab_button} onClick={() => props.changeProfileToBlue()}>
                            Blue
                        </IonButton>
                        <IonButton fill="clear" className={theme.transparent_tab_button} onClick={() => props.changeProfileToGreen()}>
                            Green
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
}

const mapDispatchToProps = {
    changeProfileToRed,
    changeProfileToBlue,
    changeProfileToGreen,
};

export default connect(null, mapDispatchToProps)(Body);
