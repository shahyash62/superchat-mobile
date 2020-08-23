import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileImage from '../../Misc/ProfileImage/ProfileImage';
import theme from './ProfileMin.module.scss';
import ProfilePage from '../../Misc/ProfilePage/ProfilePage';

export class ProfileMin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProfilePageOpen: false,
        };
        this.toggleProfilePage = this.toggleProfilePage.bind(this);
    }

    toggleProfilePage = () => {
        this.setState((state) => ({
            isProfilePageOpen: !state.isProfilePageOpen,
        }));
    };

    render() {
        console.log('Theme', theme);
        return (
            <div className={theme.container}>
                <div className={theme.content_container}>
                    <ProfileImage></ProfileImage>
                    <div className={theme.text_container}>
                        <p className={theme.username}>{this.props.nickname}</p>
                        <p className={theme.profile_min_status}>{this.props.status}</p>
                    </div>
                </div>
                <button onClick={this.toggleProfilePage} className={`button is-outlined ${theme.user_profile_button}`}>
                    BUTTON
                </button>
                {this.state.isProfilePageOpen ? <ProfilePage toggleProfilePage={this.toggleProfilePage}></ProfilePage> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const selectedProfile = state.userData.selectedProfile;
    const newProps = {
        nickname: state.userData[selectedProfile].nickname,
        status: state.userData[selectedProfile].status,
    };
    console.log('ProfileMin mappedStateToProps: ', newProps);
    return newProps;
};

export default connect(mapStateToProps)(ProfileMin);
