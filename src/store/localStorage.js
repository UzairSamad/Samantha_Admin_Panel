import _ from "lodash"

export const setClientToken = (token) => {
    localStorage.setItem('client_token', token);
}