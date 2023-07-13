import { cache } from "@/utils/index";
import { setAuthorization, request } from "@/utils/request";
import { sleep } from "@/utils/toolsFn";
import { message } from "ant-design-vue";
import { renewal } from "@/api/login/login";

const codeMessage = {
    100: "登陆状态失效，正在重新登陆",
    400: "请求错误",
    401: "权限不足",
    403: "禁止请求",
    404: "请求失败，资源未找到",
    405: "禁止请求",
    406: "不接受该请求",
    408: "请求超时",
    409: "请求冲突",
    410: "请求失败，资源未找到",
    413: "请求失败，资源过大",
    500: "服务器内部错误",
    502: "错误网关",
    503: "服务不可用",
    504: "网关超时",
    505: "HTTP 版本不受支持",
};

const reqCommon = {
    /**
     * 请求拦截
     * @param config axios config
     * @returns {*}
     */
    onFulfilled(config) {
        const { xsrfHeaderName } = config;
        xsrfHeaderName && (config.headers[xsrfHeaderName] = cache.getCache(xsrfHeaderName));
        return config;
    },
    /**
     * 请求出错
     * @param error 错误对象
     * @returns {Promise<never>}
     */
    onRejected(error) {
        message.error(error.message);
        return Promise.reject(error);
    },
};

const respCommon = {
    onFulfilled(response) {
        return (async (response) => {
            // if (response.data?.code === 20000) {
            //     return response.data.data;
            // } else if (response.data?.code >= 40000 && response.data?.code <= 49999) {
            //     if (response.data?.code === 40004) {
            //         // 如果当前没有发起续签请求，则发起，否则 等待
            //         if (!store.stopAjax) {
            //             store.stopAjax = true;
            //             // jwt请求头过期，需要续签
            //             const res = await renewal();
            //             setAuthorization({ token: res?.token });
            //             store.stopAjax = false;
            //         }
            //         return await new Promise((resolve) => {
            //             var timer = setInterval(async () => {
            //                 if (!store.stopAjax) {
            //                     clearInterval(timer);
            //                     const { url, method, data, baseURL } = response.config;
            //                     const res = await request(url, method, data, { baseURL });
            //                     resolve(res);
            //                 }
            //             }, 500);
            //         });
            //     } else {
            //         message.error("登陆状态失效，正在重新登陆");
            //         await sleep(1000);
            //         store.logoutAction({ path: "/", isLogout: false });
            //         return response;
            //     }
            // } else {
            //     message.error(response.data.message || "系统异常，请联系管理员");
            //     return {};
            // }
            return response;
        })(response);
    },

    onRejected(error) {
        const { response } = error;
        if (response == undefined) return; // 取消请求 无响应 但不需要抛错
        message.error(
            codeMessage[response?.status] ||
                (error.message === "Network Error" ? "网络连接已断开，请检查网络" : null) ||
                (error.message === "timeout of 5000ms exceeded" ? "请求超时，请检查网络" : null) ||
                "请求出错，请联系管理员",
        );
        return Promise.reject(error);
    },
};

export default {
    request: [reqCommon],
    response: [respCommon],
};
