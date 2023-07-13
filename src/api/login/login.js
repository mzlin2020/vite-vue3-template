import { request, METHOD, ENV, MODE } from "@/utils/request";

// 退出登录
export const logout = () => {
    if (MODE == "development") {
        return request("/oauth/logout", METHOD.POST, {}, { baseURL: ENV.VITE_SSO_URL });
    }
    return request("/api/oauth/logout", METHOD.POST, {}, { baseURL: ENV.VITE_SSO_URL });
};

// 续签jwt
export const renewal = () => {
    if (MODE == "development") {
        return request("/oauth/renewal", METHOD.POST, {}, { baseURL: ENV.VITE_SSO_LOGOUT_URL });
    }
    return request("/api/oauth/renewal", METHOD.POST, {}, { baseURL: ENV.VITE_SSO_LOGOUT_URL });
};
