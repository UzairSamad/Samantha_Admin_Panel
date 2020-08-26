import EventEmitter from 'events';
import jwtDecode from 'jwt-decode';
/* eslint-disable camelcase */

class JwtService extends EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		// axios.interceptors.response.use(
		// 	response => {
		// 		return response;
		// 	},
		// 	err => {
		// 		return new Promise((resolve, reject) => {
		// 			if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
		// 				// if you ever get an unauthorized response, logout the user
		// 				this.emit('onAutoLogout', 'Invalid access_token');
		// 				this.setSession(null);
		// 			}
		// 			throw err;
		// 		});
		// 	}
		// );
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
            resolve(true);
			
		});
	};

	signInWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
            resolve(true);
			
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			resolve();
		});
	};

	updateUserData = user => {
		return {
            username: 'admin'
        }
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
		} else {
			localStorage.removeItem('jwt_access_token');
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;
