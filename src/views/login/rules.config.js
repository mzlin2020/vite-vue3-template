// 校验账号
let validateAccount = async (_rule, value) => {
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const phoneNumberRegex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    // // 验证是否纯数字
    // const numReg = /^\d+$/;
    // if (value === "") {
    //     return Promise.reject("请输入邮箱/手机号");
    // } else if (numReg.test(value) && !phoneNumberRegex.test(value)) {
    //     return Promise.reject("请输入正确的手机号");
    // } else if (!numReg.test(value) && !emailRegex.test(value)) {
    //     return Promise.reject("请输入正确格式的邮箱，50个字符以内");
    // } else {
    //     return Promise.resolve();
    // }

    const reg = /^[a-zA-Z0-9_-]{2,20}$/;
    if (value === "") {
        return Promise.reject("请输入用户名");
    } else if (!reg.test(value)) {
        return Promise.reject("用户名存在非法特殊字符");
    } else {
        return Promise.resolve();
    }
};

// 校验密码
let validatePass = async (_rule, value) => {
    if (value === "") {
        return Promise.reject("请输入密码");
    } else {
        return Promise.resolve();
    }
};

const validateCaptcha = async (_rule, value) => {
    if (value === "") {
        return Promise.reject("请输入验证码");
    } else {
        return Promise.resolve();
    }
};

const rules = {
    account: [
        {
            required: true,
            validator: validateAccount,
            trigger: "change",
        },
    ],
    password: [
        {
            validator: validatePass,
            trigger: "change",
        },
    ],
    captchaCode: [
        {
            validator: validateCaptcha,
            trigger: "change",
        },
    ],
};

export { rules };
