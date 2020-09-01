import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonButton, IonIcon, IonFooter, IonButtons } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import GroupList from './GroupList/GroupList';
import { changeProfileToBlue, changeProfileToRed, changeProfileToGreen } from '../../StateManagement/User/UserActions';
import { setInitialState } from '../../StateManagement/Content/ContentActions';
import theme from './Body.module.scss';

function Body(props) {
    const { selectedProfile } = props;
    useEffect(() => {
        props.setInitialState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-padding">{'SuperChat :)'}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color>
                <GroupList></GroupList>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButtons slot="end">
                        <IonButton
                            color={selectedProfile === 'red' ? 'primary' : null}
                            fill="outline"
                            className={theme.transparent_tab_button}
                            onClick={() => props.changeProfileToRed()}
                        >
                            Red
                        </IonButton>
                        <IonButton
                            color={selectedProfile === 'blue' ? 'primary' : null}
                            fill="outline"
                            className={theme.transparent_tab_button}
                            onClick={() => props.changeProfileToBlue()}
                        >
                            Blue
                        </IonButton>
                        <IonButton
                            color={selectedProfile === 'green' ? 'primary' : null}
                            fill="outline"
                            className={theme.transparent_tab_button}
                            onClick={() => props.changeProfileToGreen()}
                        >
                            Green
                        </IonButton>
                    </IonButtons>
                    <IonButton routerLink="/loggedin/settings" fill="clear" slot="start">
                        <IonIcon slot="icon-only" icon={settingsOutline} />
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
}

const mapStateToProps = (state) => {
    const newProps = {
        selectedProfile: state.userData.selectedProfile,
    };
    return newProps;
};

const mapDispatchToProps = {
    changeProfileToRed,
    changeProfileToBlue,
    changeProfileToGreen,
    setInitialState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
