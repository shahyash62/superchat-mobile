import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTextMessage } from '../../../../StateManagement/EditContent/EditContentActions';
import { sendMessage } from '../../../../StateManagement/Content/ContentActions';
import theme from './ChatBar.module.scss';
import { IonItem, IonInput, IonButton } from '@ionic/react';

function ChatBar(props) {
    return (
        <IonItem>
            <IonInput
                placeholder="mkc"
                value={props.message}
                onIonChange={(event) => {
                    props.editTextMessage(event.detail.value);
                }}
                onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                        props.sendMessage(props.message, props.nextId, 'sent');
                        props.editTextMessage('');
                    }
                }}
                inputMode="text"
                className={theme.chat_input}
            />

            <IonButton
                className={`button ${theme.chatbar_send_btn}`}
                onClick={() => {
                    props.sendMessage(props.message, props.nextId, 'sent');
                    props.editTextMessage('');
                }}
            >
                Send
            </IonButton>
        </IonItem>
    );
}

const mapStateToProps = (state) => {
    // contentToBe
    const newProps = {
        message: state.contentToBe.message.text,
        nextId: state.content.messages.nextId(),
    };
    console.log('ChatBar mapStateToProps Mapped Props: ', newProps);
    return newProps;
};

const mapDispatchToProps = {
    editTextMessage,
    sendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBar);
