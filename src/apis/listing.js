import { http } from '../helpers';

export const listing = (params) => {
    return new Promise((resolve, reject) => {
        try {
            http(
                [

                ],
                'POST:backoffice/listing:JSON',
                params,
            )
                .then((res) => {
                  
                    if (res.code === 200) resolve(res.data.list.list)
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