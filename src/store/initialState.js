const initialState = {
    client_auth: {
        in_progress: false,
        client_auth_response: {},
        client_auth_error: {},
    },
    order_list: {
        in_progress: true,
        order_list_response: {
            list: {
                list: []
            }
        },
        order_list_error: {}
    },

    client_list: {
        in_progress: true,
        client_list_response: {
            list: {
                list: []
            }
        },
        client_list_error: {}
    },
    service_industries_list: {
        in_progress: true,
        service_industries_list_response: {
            list: {
                list: []
            }
        },
        service_industries_list_error: {}
    },
    service_categories_list: {
        in_progress: true,
        service_categories_list_response: {
            list: {
                list: []
            }
        },
        service_categories_list_error: {}
    },
}

export default initialState;
