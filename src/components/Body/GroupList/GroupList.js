import React from 'react';
import { connect } from 'react-redux';
import { IonList, IonItem, IonListHeader } from '@ionic/react';
import { selectGroup } from '../../../StateManagement/Content/ContentActions';
import GroupItem from './GroupItem/GroupItem';

function GroupList(props) {
    return (
        <IonList>
            <IonListHeader>Contacts:</IonListHeader>
            {props.contactList.map((contact) => {
                const groupId = contact.username;
                const currGroup = props.groups[groupId];
                const displayMessage = props.messages[currGroup.messageIdList[currGroup.messageIdList.length - 1]];
                const displayMessageText = displayMessage ? displayMessage.text : null;
                return (
                    <IonItem
                        onClick={() => {
                            props.selectGroup(groupId);
                        }}
                        key={groupId}
                        routerLink={`/contentwindow/${groupId}`}
                    >
                        <GroupItem groupName={currGroup.groupName} displayMessage={displayMessageText} unread={currGroup.unread}></GroupItem>
                    </IonItem>
                );
            })}
        </IonList>
    );
}

const mapStateToProps = (state) => {
    const selectedProfileData = state.userData[state.userData.selectedProfile];
    const content = state.content;
    const newProps = {
        selectedGroup: content[state.userData.selectedProfile].selectedGroup,
        contactList: selectedProfileData.contactList,
        groups: content.groups.byId,
        messages: content.messages.byId,
    };
    console.log('GroupList mappedStateToProps: ', newProps);
    console.log('GroupList fullState: ', state);
    return newProps;
};

const mapDispatchToProps = {
    selectGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
