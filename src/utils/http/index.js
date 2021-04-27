import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { deepMerge } from '../deep';
import { EAxios, errorResult } from './request';
import { isString } from '../is';

const appProps = {
    srcBizSeqNo: '999988888',
    srcBizDate: '',
    userLang: '',
    txOrgNo: '1234',
    txLprOrgNo: '',
    txUserId: '',
    retStatus: '',
    trgBizDate: '',
    trgBizSeqNo: '',
    orgChannelType: 'wc',
    globalBizSeqNo: '123',
    orgPartnerId: '',
    orgScenarioId: '',
    orgSysId: 'iloan',
    reverseSeqNo: '',
    srcDcn: '',
    srcServerId: '',
    srcServiceId: '',
    srcTopicId: '',
    srcSysVersion: '',
    srcTimeStamp: '',
    trgTopicId: '',
    trgServiceId: '',
    trgTimeStamp: '',
    txAuthFlag: '',
    txDeptCode: '',
};

const transform = {
    requestInterceptorsCatch: (error) => {
        return Promise.reject(error);
    },
    responseInterceptorsCatch: (error) => {
        return Promise.reject(error);
    },
    requestInterceptors: (config, options) => {

        console.log('config', config);
        console.log('options', options);
        const { prefix, apiUrl, joinPrefix, formatDate } = config;

        if (joinPrefix) {
            config.url = `${prefix}${config.url}`;
        }

        if (apiUrl && isString(apiUrl)) {
            config.url = `${apiUrl}${config.url}`;
        }

        if (config.method === 'GET') {
            const now = new Date().getTime();
            if (!isString(config.params)) {
                config.data = {
                    // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
                    params: Object.assign(config.params || {}, {
                        _t: now,
                    }),
                };
            } else {
                // 兼容restful风格
                config.url = config.url + config.params + `?_t=${now}`;
                config.params = undefined;
            }
        } else {
            if (!isString(config.params)) {
                config.data = config.params;
                config.params = undefined;
            } else {
                // 兼容restful风格
                config.url = config.url + config.params;
                config.params = undefined;
            }
        }

        return config;
    },
    responseInterceptors: (res) => {
        console.log("res", res);
        console.log("options");
        const { isTransformRequestResult } = options;
        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if (!isTransformRequestResult) {
            return res.data;
        }
        // 错误的时候返回

        const { data } = res;
        if (!data) {
            // return '[HTTP] Request has no return value';
            return errorResult;
        }
        //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
        const { code, result, message } = data;

        // 这里逻辑可以根据项目进行修改
        const hasSuccess = data && Reflect.has(data, 'code')
        if (!hasSuccess) {
            if (message) {
                // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
                if (options.errorMessageMode === 'modal') {
                    // console.log('modal', message);
                } else {
                    // console.log('message', message);
                }
            }
            Promise.reject(new Error(message));
            return errorResult;
        }
        // 接口请求成功，直接返回结果
        if (code === 'success') {
            return result;
        }
        // 接口请求错误，统一提示错误信息
        if (code === 'error') {
            if (message) {
                Promise.reject(new Error(message));
            } else {
                Promise.reject(new Error(message));
            }
            return errorResult;
        }
        // 登录超时
        if (code === 'timeout') {

            return errorResult;
        }
        return errorResult;
    },

};
const PREFIX_V1 = process.env.VUE_APP_API_PRE_FIX_URL;

function createAxios(opt) {
    return new EAxios(
        deepMerge(
            {
                timeout: 6 * 1000,
                // headers: { 'Content-Type': ContentTypeEnum.JSON },
                // 数据处理方式
                transform,
                // 配置项，下面的选项都可以在独立的接口请求中覆盖
                requestOptions: {
                    // 接口前缀
                    prefix: PREFIX_V1,
                    // 默认将prefix 添加到url
                    joinPrefix: true,
                    // 需要对返回数据进行处理
                    isTransformRequestResult: true,
                    // 格式化提交参数时间
                    formatDate: true,
                    // 消息提示类型
                    errorMessageMode: 'none',
                    // 接口地址
                    apiUrl: process.env.VUE_APP_API_BASE_URL,
                },
            },
            opt || {}
        )
    );
}

export const _axios = createAxios();
