import React from 'react';
import { connect } from 'react-redux';
import { editUsername, editStatus } from '../../../StateManagement/User/UserActions';
import ProfileImage from '../ProfileImage/ProfileImage';
import theme from './ProfilePage.module.scss';
import ProfilePageAddContactForm from './ProfilePageAddContactForm';
import { IonPage, IonContent, IonItem, IonLabel, IonInput } from '@ionic/react';

function ProfilePage(props) {
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonItem className={theme.profile_page_dp_container}>
                    <ProfileImage className={theme.profile_page_dp}></ProfileImage>
                </IonItem>
                <form>
                    <IonItem>
                        <IonLabel htmlFor="name" className="label">
                            Nickname:
                        </IonLabel>
                        <IonInput
                            className="input"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="name"
                            value={props.nickname}
                            onIonChange={(event) => {
                                props.editUsername(event.target.value);
                            }}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Status:</IonLabel>
                        <IonInput
                            className="input"
                            type="text"
                            name="status"
                            id="status"
                            value={props.status}
                            onIonChange={(event) => {
                                props.editStatus(event.target.value);
                            }}
                        />
                    </IonItem>
                    {/* <div className="control">
                        <button className="button is-primary" type="button">
                            Save
                        </button>
                    </div> */}
                </form>
                <ProfilePageAddContactForm></ProfilePageAddContactForm>
            </IonContent>
        </IonPage>
    );
}

const mapStateToProps = (state) => {
    console.log('ProfilePage fullState: ', state);
    const { selectedProfile } = state.userData;
    const newProps = {
        nickname: state.userData[selectedProfile].nickname,
        status: state.userData[selectedProfile].status,
    };
    console.log('ProfilePage mappedStateToProps: ', newProps);
    return newProps;
};

const mapDispatchToProps = {
    editUsername,
    editStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
