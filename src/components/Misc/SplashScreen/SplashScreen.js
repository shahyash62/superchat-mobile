import React from 'react';
import './SplashScreen.scss';

function SplashScreen() {
    return (
        <div className="splash-screen-modal">
            <div className="splash-screen-container">
                <p className="title is-2">Loading you :)</p>
                <progress className="splash-screen-progress-bar progress is-primary" max="100">
                    100%
                </progress>
            </div>
        </div>
    );
}

export default SplashScreen;
