import { getClientToken, getUserToken } from '../store/localStorage';
import { API_BASE, API_KEY, ENABLE_HTTP_LOGS } from '../constants/AppConstants';

export default async function HttpHandler(
    headers,
    endpoint,
    params,
    json = true,
) {

    const clientToken = getClientToken();
    const userToken = getUserToken();

    const _headers = {};

    _headers['X-Requested-With'] = "XMLHttpRequest";

    const [method, _endpoint, content] = endpoint.split(':');

    if (headers.includes('bl-api-key')) _headers['bl-api-key'] = API_KEY;

    if (headers.includes('bl-client-token')) _headers['bl-client-token'] = (clientToken === null) ? "" : clientToken;

    if (headers.includes('bl-user-token')) _headers['bl-user-token'] = (userToken === null) ? "" : userToken;

    if (content && content.toUpperCase() === 'JSON') _headers['Content-Type'] = "application/json";

    const requestConfig = {
        method,
        headers: new Headers(_headers)
    };

    if (ENABLE_HTTP_LOGS) console.log("${Config.API_BASE}${_endpoint} :", `${API_BASE}${_endpoint}`);

    if (method && method.toUpperCase() === 'POST') requestConfig['body'] = JSON.stringify(params)
    if (method && method.toUpperCase() === 'DELETE') requestConfig['body'] = JSON.stringify(params)

    if (ENABLE_HTTP_LOGS) console.log("HTTP HANDLER > requestConfig >", requestConfig);

    let response = await fetch(`${API_BASE}${_endpoint}`, requestConfig);

    if (json) {
        response = await response.json();
        if (ENABLE_HTTP_LOGS) console.log("HTTP HANDLER > response >", response);
    }

    return response;
}