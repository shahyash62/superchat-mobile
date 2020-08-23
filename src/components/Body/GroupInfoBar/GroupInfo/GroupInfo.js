import React from 'react';
import './GroupInfo.scss';

function GroupInfo(props) {
    const { groupMembers = [] } = props;
    return (
        <div className="group-info">
            <p className="group-info-group-name has-text-weight-bold">{props.groupName}</p>
            <p className="group-info-members">{groupMembers.join(', ')}</p>
        </div>
    );
}

export default GroupInfo;
