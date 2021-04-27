

import axios from 'axios';
import { AxiosCanceler } from "./cancelToken"
import { isFunction } from '../is';
import { cloneDeep } from 'lodash-es';

export const errorResult = '__ERROR_RESULT__';

export class EAxios {
    axiosInstance = null;
    options;

    constructor(options) {
        console.log('options', options);
        this.options = options;
        this.axiosInstance = axios.create(options);
        this.setupInterceptors();
    }

    createAxios(config) {
        this.axiosInstance = axios.create(config);
    }
    setupInterceptors() {
        const transform = this.getTransform();
        console.log(transform);
        if (!transform) {
            return;
        }
        const {
            requestInterceptors,
            requestInterceptorsCatch,
            responseInterceptors,
            responseInterceptorsCatch,
        } = transform

        const axiosCanceler = new AxiosCanceler();

        // 请求拦截器配置处理
        this.axiosInstance.interceptors.request.use((config) => {
            const { headers: { ignoreCancelToken } = { ignoreCancelToken: false } } = config;
            !ignoreCancelToken && axiosCanceler.addPending(config);
            if (requestInterceptors && isFunction(requestInterceptors)) {
                config = requestInterceptors(config, this.options);
            }
            return config;
        }, undefined);

        // 请求拦截器错误捕获
        requestInterceptorsCatch &&
            isFunction(requestInterceptorsCatch) &&
            this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

        // 响应结果拦截器处理
        this.axiosInstance.interceptors.response.use((res) => {
            console.log(res);
            res && axiosCanceler.removePending(res.config);
            if (responseInterceptors && isFunction(responseInterceptors)) {
                res = responseInterceptors(res);
            }
            return res;
        }, undefined);

        // 响应结果拦截器错误捕获
        responseInterceptorsCatch &&
            isFunction(responseInterceptorsCatch) &&
            this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
    }

    getTransform() {
        const { transform } = this.options;
        return transform;
    }

    setAxios(config) {
        if (!config) return
        this.createAxios(config)
    }

    getAxios() {
        return this.axiosInstance
    }


    uploadFile(config, params) {
        const formData = new window.FormData();

        if (params.data) {
            Object.keys(params.data).forEach((key) => {
                if (!params.data) return;
                const value = params.data[key];
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(`${key}[]`, item);
                    });
                    return;
                }

                formData.append(key, params.data[key]);
            });
        }

        formData.append(params.name || 'file', params.file, params.filename);

        return this.axiosInstance.request({
            ...config,
            method: 'POST',
            data: formData,
            headers: {
                // 'Content-type': ContentTypeEnum.FORM_DATA,
                ignoreCancelToken: true,
            },
        });
    }

    /**
     * @description:   请求方法
     */
    request(config, options) {
        let conf = cloneDeep(config);
        const transform = this.getTransform();

        const { requestOptions } = this.options;

        const opt = Object.assign({}, requestOptions, options);

        const { requestInterceptors, requestErrorCatch, responseInterceptors } = transform || {};
        if (requestInterceptors && isFunction(requestInterceptors)) {
            conf = requestInterceptors(conf, opt);
        }
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request(conf)
                .then((res) => {
                    if (responseInterceptors && isFunction(responseInterceptors)) {
                        const ret = responseInterceptors(res, opt);
                        ret !== errorResult ? resolve(ret) : reject(new Error('request error!'));
                        return;
                    }
                    resolve(res);
                })
                .catch((e) => {

                    if (requestErrorCatch && isFunction(requestErrorCatch)) {
                        reject(requestErrorCatch(e));
                        return;
                    }
                    reject(e);
                });
        });
    }
}