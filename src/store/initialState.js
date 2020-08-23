const initialState = {
    client_auth: {
        in_progress: false,
        client_auth_response: {},
        client_auth_error: {},
    },
    order_list: {
        in_progress: true,
        order_list_response: {
            list: []
        },
        order_list_error: {}
    },
}

export default initialState;
