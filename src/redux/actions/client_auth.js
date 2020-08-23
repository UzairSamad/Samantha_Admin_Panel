import {
    CLIENT_AUTH
} from '../../constants/ActionTypes'

import { client_auth } from '../../apis/client_auth';

export const client_auth_action = () => ({
    type: CLIENT_AUTH,
    payload: client_auth()
})    
