import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import ContentWindow from './Body/ContentWindow/ContentWindow';
import Body from './Body/Body';
import LandingForm from './LandingForm/LandingForm';
import ProfilePage from './Misc/ProfilePage/ProfilePage';

function Home({ showAppBody }) {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route
                        exact
                        path="/landingpage"
                        render={(props) => {
                            return showAppBody ? <Body {...props} /> : <LandingForm {...props} />;
                        }}
                    />
                    <Route exact path="/contentwindow/:groupid" component={ContentWindow} />
                    <Route exact path="/loggedin/settings" component={ProfilePage} />
                    <Route exact path="/loggedin" component={Body} />
                    <Redirect exact from="/" to="/landingpage" />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}

const mapStateToProps = (state) => {
    const newProps = {
        showAppBody: state.userData.authorization.isUserLoggedIn && state.userData.authorization.isUserDataLoaded,
    };
    console.log('Home mapStateToProps: ', newProps);
    return newProps;
};

export default connect(mapStateToProps)(Home);
