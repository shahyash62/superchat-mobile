import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, useParams } from 'react-router-dom';
import {
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonRouterOutlet,
    IonButton,
    IonIcon,
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import GroupList from './GroupList/GroupList';
import { changeProfileToBlue, changeProfileToRed, changeProfileToGreen } from '../../StateManagement/User/UserActions';
import theme from './Body.module.scss';

function Body(props) {
    console.log(useParams());
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-padding">Zen Body</IonTitle>
                    <IonButton routerLink="/loggedin/settings" fill="clear" slot="end">
                        <IonIcon slot="icon-only" icon={settingsOutline} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/loggedin/:profile" component={GroupList} />
                        <Redirect exact from="/loggedin" to="/loggedin/red" />
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton href="/loggedin/red" tab="Red">
                            <IonLabel>Red</IonLabel>
                            <IonButton fill="clear" className={theme.transparent_tab_button} onClick={() => props.changeProfileToRed()}></IonButton>
                        </IonTabButton>

                        <IonTabButton href="/loggedin/blue" tab="Blue">
                            <IonLabel>Blue</IonLabel>
                            <IonButton fill="clear" className={theme.transparent_tab_button} onClick={() => props.changeProfileToBlue()}></IonButton>
                        </IonTabButton>

                        <IonTabButton href="/loggedin/green" tab="Green">
                            <IonLabel>Green</IonLabel>
                            <IonButton fill="clear" className={theme.transparent_tab_button} onClick={() => props.changeProfileToGreen()}></IonButton>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonContent>
        </IonPage>
    );
}

const mapDispatchToProps = {
    changeProfileToRed,
    changeProfileToBlue,
    changeProfileToGreen,
};

export default connect(null, mapDispatchToProps)(Body);
