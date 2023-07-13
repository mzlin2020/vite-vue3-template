import axios from "axios";
import { cache } from "@/utils";
import { isEmpty } from "lodash";

const ENV = import.meta.env;
const MODE = import.meta.env.MODE;
axios.defaults.baseURL = ENV.VUE_APP_API_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.timeout = 5000;

const xsrfHeaderName = "Authorization"; // 跨域认证信息 header 名
axios.defaults.xsrfHeaderName = xsrfHeaderName;

// 认证类型
const AUTH_TYPE = {
    BEARER: "Bearer",
    BASIC: "basic",
    AUTH1: "auth1",
    AUTH2: "auth2",
};

// http method
const METHOD = {
    GET: "get",
    POST: "post",
};

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(url, method, params, config) {
    switch (method) {
        case METHOD.GET:
            return axios.get(url, { params, ...config });
        case METHOD.POST:
            return axios.post(url, params, config);
        default:
            return axios.get(url, { params, ...config });
    }
}

/**
 * 设置认证信息
 * @param auth {Object}
 * @param authType {AUTH_TYPE} 认证类型，默认：{AUTH_TYPE.BEARER}
 */
function setAuthorization(auth, authType = AUTH_TYPE.BEARER) {
    switch (authType) {
        case AUTH_TYPE.BEARER:
            cache.setCache(xsrfHeaderName, "Bearer " + auth.token);
            break;
        case AUTH_TYPE.BASIC:
        case AUTH_TYPE.AUTH1:
        case AUTH_TYPE.AUTH2:
        default:
            break;
    }
}

/**
 * 移出认证信息
 * @param authType {AUTH_TYPE} 认证类型
 */
function removeAuthorization(authType = AUTH_TYPE.BEARER) {
    switch (authType) {
        case AUTH_TYPE.BEARER:
            cache.remove(xsrfHeaderName);
            break;
        case AUTH_TYPE.BASIC:
        case AUTH_TYPE.AUTH1:
        case AUTH_TYPE.AUTH2:
        default:
            break;
    }
}

/**
 * 检查认证信息
 * @param authType
 * @returns {boolean}
 */
function checkAuthorization(authType = AUTH_TYPE.BEARER) {
    switch (authType) {
        case AUTH_TYPE.BEARER:
            if (
                !isEmpty(cache.getCache(xsrfHeaderName)) &&
                !isEmpty(cache.getCache("login")?.menus) &&
                !isEmpty(cache.getCache("userInfo"))
            ) {
                return true;
            }
            break;
        case AUTH_TYPE.BASIC:
        case AUTH_TYPE.AUTH1:
        case AUTH_TYPE.AUTH2:
        default:
            break;
    }
    return false;
}

/**
 * 加载 axios 拦截器
 * @param interceptors
 */
function loadInterceptors(interceptors) {
    const { request, response } = interceptors;
    // 加载请求拦截器
    request.forEach((item) => {
        let { onFulfilled, onRejected } = item;
        if (!onFulfilled || typeof onFulfilled !== "function") {
            onFulfilled = (config) => config;
        }
        if (!onRejected || typeof onRejected !== "function") {
            onRejected = (error) => Promise.reject(error);
        }
        axios.interceptors.request.use(
            (config) => onFulfilled(config),
            (error) => onRejected(error),
        );
    });
    // 加载响应拦截器
    response.forEach((item) => {
        let { onFulfilled, onRejected } = item;
        if (!onFulfilled || typeof onFulfilled !== "function") {
            onFulfilled = (response) => response;
        }
        if (!onRejected || typeof onRejected !== "function") {
            onRejected = (error) => Promise.reject(error);
        }
        axios.interceptors.response.use(
            (response) => onFulfilled(response),
            (error) => onRejected(error),
        );
    });
}

export {
    AUTH_TYPE,
    METHOD,
    MODE,
    ENV,
    request,
    setAuthorization,
    removeAuthorization,
    checkAuthorization,
    loadInterceptors,
};
