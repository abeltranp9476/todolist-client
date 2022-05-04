import axios from 'axios';

const MERCAZONA_API_BASE_URL = process.env.REACT_APP_API_URL;
const MERCAZONA_API_TIMEOUT = 120000;

export const api = axios.create({
    timeout: MERCAZONA_API_TIMEOUT,
    baseURL: MERCAZONA_API_BASE_URL,
    headers: {
        Accept: 'application/json'
    },
    transformResponse: [
        function transformResponse(data) {
            if (typeof data === 'string') {
                try {
                    if (!String.prototype.trim) {
                        // eslint-disable-next-line
                        String.prototype.trim = function () {
                            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
                        };
                    }
                    data = JSON.parse(data.trim(''));
                    // eslint-disable-next-line no-empty
                } catch (e) {
                }
            }
            return data;
        },
    ],
});
