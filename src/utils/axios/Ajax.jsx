import axios from "axios";
import { mergeWith } from "lodash";
import { ACCESS_TOKEN, USER_DATA } from "src/utils/constant";
import storage from "src/utils/storage";


export class Ajax {
    static options;
    static setGlobalOptions(options) {
        axios.defaults = mergeWith(
            {},
            axios.defaults,
            Ajax.buildOptions(options)
        );
    }

    static async buildOptions(
        options
    ) {
        if (!options) {
            return {};
        }

        const config = {};
        if (options.baseURL) {
            config.baseURL = options.baseURL;
        }
        if (options.headerAuthorization) {
            if (!config.headers) {
                config.headers = {};
            }
            if (!config.headers.common) {
                config.headers.common = {};
            }

            const authorization =
                typeof options.headerAuthorization === "string"
                    ? options.headerAuthorization
                    : await options.headerAuthorization();
            const keyAuthorization = "Authorization";

            config.headers.common[keyAuthorization] = "Bearer " + authorization;
        }

        if (options.headers) {
            if (!config.headers) {
                config.headers = {};
            }
            if (!config.headers.common) {
                config.headers.common = {};
            }
            for (const key of Object.keys(options.headers)) {
                config.headers.common[key] = options.headers[key];
            }
        }
        return config;
    }

    static async instance(
        options
    ) {
        const result = options
            ? axios.create(await Ajax.buildOptions(options))
            : axios.create();

        if (options) {
            if (options.onRequest || options.onRequestError) {
                result.interceptors.request.use(
                    (options).onRequest ||
                    ((config) => config),
                    options.onRequestError ||
                    ((error) => Promise.reject(error))
                );
            }
            if (options.onResponse || options.onResponseError) {
                result.interceptors.response.use(
                    options.onResponse || ((response) => response),
                    options.onResponseError ||
                    ((error) => Promise.reject(error))
                );
            }
        }

        result.interceptors.response.use(
            (response) => response.data,
            (error) => {
                if (error?.response?.status === 401) {
                    storage.removeCookie(ACCESS_TOKEN);
                    storage.removeCookie(USER_DATA);
                }
                return Promise.reject(error.response);
            }
        );

        //SET APPLICATION KEY TO HEADER
        // result.interceptors.request.use((config) => {
        //     config.headers.common["X-Api-Key"] = '44E5F262BF7F1B9724DC856A39C94';
        //     config.headers.common["X-Application-key"] = 'D48881FE81C53EBA';
        //     return config;
        // });

        return result;
    }

    options;

    constructor(options) {
        this.options = options;
    }

    instance = async () =>
        await Ajax.instance(this.options);

    get = async (url, data = {}) => {
        return (await this.instance()).get(url, {
            params: data,
        });
    };
    post = async (url, data)=> {
        return (await this.instance()).post(url, data);
    };
    postForm = async (url, data)=> {
        const formData = new FormData(); // Must be FormData so that the ajax request will be Form post
        Object.keys(data).forEach(k => {
            formData.append(k, data[k]);
        });
        return (await this.instance()).post(url, formData);
    };
    remove = async (url)=> {
        return (await this.instance()).delete(url);
    };
    delete = async (url, data)=> {
        return (await this.instance()).delete(url, { params: data });
    };
    put = async (url, data)=> {
        return (await this.instance()).put(url, data);
    };
    patch = async (url, data)=> {
        return (await this.instance()).patch(url, data);
    };
}

const ajax = new Ajax();

export default ajax;
