import React from 'react';
import './ProfileChanger.scss';
import { connect } from 'react-redux';
import { changeProfileToBlue, changeProfileToRed, changeProfileToGreen } from '../../../StateManagement/User/UserActions';

function ProfileChanger(props) {
    return (
        <div className="profile-changer">
            <button className="button is-danger profile-changer-button" onClick={props.changeProfileToRed}></button>
            <button className="button is-info profile-changer-button" onClick={props.changeProfileToBlue}></button>
            <button className="button is-primary profile-changer-button" onClick={props.changeProfileToGreen}></button>
        </div>
    );
}

const mapDispatchToProps = {
    changeProfileToRed,
    changeProfileToBlue,
    changeProfileToGreen,
};

export default connect(null, mapDispatchToProps)(ProfileChanger);
