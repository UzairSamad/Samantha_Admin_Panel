import { http } from '../helpers';

export const client_auth = () => {

    return new Promise((resolve, reject) => {
        try {
            http(
                [
                    'bl-api-key'
                ],
                'GET:client/auth:JSON',
            )
                .then((res) => {
                    if (res.code === 200) resolve(res.data)
                    if (res.code !== 200) reject(res)
                })
                .catch((e) => {
                    reject(e)
                })
        } catch (error) {
            reject(error)
        }
    });
};