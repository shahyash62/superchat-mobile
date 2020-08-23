import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileImage from '../../Misc/ProfileImage/ProfileImage';
import './GroupInfoBar.scss';
import GroupInfo from './GroupInfo/GroupInfo';

export class GroupInfoBar extends Component {
    render() {
        return (
            <div className="group-info-container">
                <ProfileImage></ProfileImage>
                <GroupInfo groupName={this.props.selectedGroupName} groupMembers={this.props.groupMembers}></GroupInfo>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const selectedProfile = state.userData.selectedProfile;
    const selectedProfileContent = state.content;
    const selectedGroup = selectedProfileContent[selectedProfile].selectedGroup;
    let newProps;
    if (selectedGroup)
        newProps = {
            selectedGroupName: selectedProfileContent.groups.byId[selectedGroup].groupName,
            groupMembers: selectedProfileContent.groups.byId[selectedGroup].members,
        };
    else {
        newProps = {
            selectedGroupName: undefined,
            groupMembers: undefined,
        };
    }
    console.log('GroupInfoBar mappedStateToProps: ', newProps);
    return newProps;
};

export default connect(mapStateToProps)(GroupInfoBar);
