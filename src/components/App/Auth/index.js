import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SplashScreen from '../SplashScreen';
import jwtService from '../../../services/jwtService';

class AppAuth extends Component {
    state = {
        waitAuthCheck: true
    };

    componentDidMount() {
        return Promise.all([
			this.jwtCheck()
		]).then(() => {
			this.setState({ waitAuthCheck: false });
		});
    }

    jwtCheck = () =>
        new Promise(resolve => {
            jwtService.on('onAutoLogin', () => {
                //this.props.showMessage({ message: 'Logging in with JWT' });

				/**
				 * Sign in and retrieve user data from Api
				 */
                jwtService
                    .signInWithToken()
                    .then(user => {
                        //this.props.setUserData(user);

                        resolve();

                        //this.props.showMessage({ message: 'Logged in with JWT' });
                    })
                    .catch(error => {
                        //this.props.showMessage({ message: error });

                        resolve();
                    });
            });

            jwtService.on('onAutoLogout', message => {
                if (message) {
                    //this.props.showMessage({ message });
                }

                //this.props.logout();

                resolve();
            });

            jwtService.on('onNoAccessToken', () => {
                resolve();
            });

            jwtService.init();

            return Promise.resolve();
        });

    render() {
        return (
            <div>
                {
                    this.state.waitAuthCheck && <SplashScreen />
                }
                {
                    !this.state.waitAuthCheck && <>{this.props.children}</>
                }
            </div>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            // logout: userActions.logoutUser,
            // setUserData: userActions.setUserData,
            // showMessage: Actions.showMessage,
            // hideMessage: Actions.hideMessage
        },
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(AppAuth);
