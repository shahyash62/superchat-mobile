import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import store from './store';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ContentWindow from './components/Body/ContentWindow/ContentWindow';
import Body from './components/Body/Body';
import LandingForm from './components/LandingForm/LandingForm';
import ProfilePage from './components/Misc/ProfilePage/ProfilePage';

const App = () => (
    <Provider store={store}>
        <IonApp>
            <IonReactRouter>
                <Switch>
                    <Route exact path="/landingform" component={LandingForm} />
                    <Route exact path="/loggedin/:profile/contentwindow/:groupid" component={ContentWindow} />
                    <Route exact path="/loggedin/settings" component={ProfilePage} />
                    <Route path="/loggedin" component={Body} />
                    <Redirect exact from="/" to="/landingform" />
                </Switch>
            </IonReactRouter>
        </IonApp>
    </Provider>
);

export default App;
