import { HttpHandler } from '../helpers/httpHelper';

export const listing = (params) => {

    return new Promise((resolve, reject) => {
        try {
            HttpHandler(
                [
                    
                ],
                'POST:backoffice/listing:JSON',
                params,
            )
                .then((res) => {

                    if (res.code === 200) resolve(res.data)
                    if (res.code !== 200) reject(res)
                })
                .catch((err) => {
                        console.log(err,'errrrrrr');
                })
        } catch (error) {
            reject(error)
        }
    });
};