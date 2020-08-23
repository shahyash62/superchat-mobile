import React from 'react';
import ProfileImage from '../../../Misc/ProfileImage/ProfileImage';
import GroupItemInfo from './GroupItemInfo/GroupItemInfo';

function GroupItem(props) {
    return (
        <React.Fragment>
            <ProfileImage slot="start"></ProfileImage>
            <GroupItemInfo {...props}></GroupItemInfo>
        </React.Fragment>
    );
}

export default GroupItem;
