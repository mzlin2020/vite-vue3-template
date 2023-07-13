/**
 * @description 延迟操作
 * @param {*} delay
 * @returns
 */
export function sleep(delay) {
    return new Promise((resolve) => setTimeout(() => resolve(), delay));
}

/**
 * @description 数据获取模拟
 * @param {*} data
 * @param {*} delay
 * @returns
 */
export const mockDataServer = (data, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
};

/**
 * @description 判断是否移动端
 * @returns
 */
export function isMobile() {
    let isMobile = false;
    let reg =
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
    if (navigator.userAgent.match(reg)) isMobile = true;
    return isMobile;
}
