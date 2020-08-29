import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent, IonList, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/react';
import Message from './Message/Message';
import ChatBar from './ChatBar/ChatBar';
import './ContentWindow.scss';
import { useParams } from 'react-router';

function ContentWindow(props) {
    const { groupid } = useParams();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/loggedin" />
                    </IonButtons>
                    <IonTitle>{groupid}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {props.messageIdList.length > 0 ? (
                    <IonList className="ion-padding">
                        {props.messageIdList.map((messageId) => {
                            const currMessage = props.messages[messageId];
                            return (
                                <Message
                                    key={messageId}
                                    messageName={currMessage.name}
                                    messageType={currMessage.type}
                                    messageText={currMessage.text}
                                    messageStatus={currMessage.status}
                                ></Message>
                            );
                        })}
                    </IonList>
                ) : null}
            </IonContent>
            <ChatBar></ChatBar>
        </IonPage>
    );
}

const mapStateToProps = (state) => {
    const selectedProfile = state.userData.selectedProfile;
    const selectedProfileContent = state.content;
    const selectedGroup = selectedProfileContent[selectedProfile].selectedGroup;
    let newProps;
    if (selectedGroup) {
        newProps = {
            messageIdList: selectedProfileContent.groups.byId[selectedGroup].messageIdList,
            messages: selectedProfileContent.messages.byId,
            showSplash: false,
        };
    } else {
        newProps = {
            messageIdList: [],
            messages: {},
            showSplash: true,
        };
    }
    console.log('ContentWindow mappedStateToProps: ', newProps);
    return newProps;
};

export default connect(mapStateToProps, null)(ContentWindow);
