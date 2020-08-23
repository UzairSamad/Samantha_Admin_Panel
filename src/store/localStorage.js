export const setClientToken = (token) => {
    localStorage.setItem('client_token', token);
}

export const getClientToken = () => localStorage.getItem('client_token');

export const setUserToken = (token) => {
    localStorage.setItem('user_token', token);
}

export const getUserToken = () => localStorage.getItem('user_token');