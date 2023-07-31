<template>
    <div class="login">
        <div class="login-left">
            <!-- <div class="logo-text">
                <p>欢迎来到</p>
                <div>logo</div>
            </div> -->
        </div>
        <div class="login-right">
            <div class="logon-panel">
                <h3 class="form-title">登录系统</h3>
                <a-form
                    :model="formState"
                    class="login-form"
                    ref="formRef"
                    autocomplete="off"
                    @validate="validate"
                    :rules="formRules"
                >
                    <a-form-item name="account">
                        <div class="input-wrapper" ref="userRef">
                            <div class="login-input">
                                <a-input
                                    v-model:value="formState.account"
                                    required
                                    @focus="handleInputFocus(userRef)"
                                    @blur="handleInputBlur(userRef, formState.account)"
                                    @pressEnter="login"
                                    :maxlength="50"
                                />
                                <label> 用户名 </label>
                            </div>
                        </div>
                    </a-form-item>

                    <a-form-item name="password">
                        <div class="input-wrapper" ref="passwordRef">
                            <div class="login-input">
                                <a-input-password
                                    v-model:value="formState.password"
                                    required
                                    @focus="(isFocus = true), handleInputFocus(passwordRef)"
                                    @blur="handleInputBlur(passwordRef, formState.password)"
                                    @pressEnter="login"
                                    :maxlength="50"
                                />
                                <label :class="{ 'label-focus': formState.password || isFocus }"> 密码 </label>
                            </div>
                        </div>
                    </a-form-item>

                    <a-form-item name="captchaCode">
                        <div style="display: flex; justify-content: space-between">
                            <div class="input-wrapper" ref="captchaCodeRef" style="flex: 0.6">
                                <div class="login-input">
                                    <a-input
                                        v-model:value="formState.captchaCode"
                                        :maxlength="4"
                                        required
                                        @focus="handleInputFocus(captchaCodeRef)"
                                        @blur="handleInputBlur(captchaCodeRef, formState.captchaCode)"
                                        @pressEnter="login"
                                    ></a-input>
                                    <label> 验证码 </label>
                                </div>
                            </div>
                            <div class="captcha-img" style="height: 52px; flex: 0.35; border: 1px solid #aaa">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </a-form-item>

                    <a-form-item style="margin-bottom: 8px">
                        <a-button type="primary" class="login-btn" @click="login" ref="loginBtn">登 录</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * @description 登录页面
 * @author 林泽明
 * @version 0.0.1
 * @creatDate 2023/07/10
 */
import { sleep } from "@/utils/toolsFn";
import { rules } from "./rules.config";
import { message } from "ant-design-vue";
import { useLoginStore } from "@/store/modules/login";

const store = useLoginStore();

const formState = reactive({
    account: "",
    password: "",
    captchaCode: "",
    remember: true,
});
const formRef = ref(null);
const passwordRef = ref(null);
const userRef = ref(null);
const captchaCodeRef = ref(null);
const loginBtn = ref(null);
const isFocus = ref(false);
const formRules = ref(null);

const login = async () => {
    formRules.value = rules;
    await sleep(0);
    await formRef.value.validateFields();
    // 校验通过
    store.loginAction();
};

/**
 * =================表单样式调整========================
 */

const handleInputFocus = (target) => {
    target.classList.add("input-wrapper-active");
};

const handleInputBlur = (target, value) => {
    if (value) return;
    target?.classList.remove("input-wrapper-active");
    isFocus.value = false;
};

const validate = (name, status) => {
    const lists = {
        account: userRef.value,
        password: passwordRef.value,
        captchaCode: captchaCodeRef.value,
    };
    status && lists[name].classList.remove("input-wrapper-error");
    !status && lists[name].classList.add("input-wrapper-error");
};
</script>

<style lang="less" scoped>
.login {
    display: flex;
    flex-wrap: nowrap;
    min-height: 100vh;
    font-size: 14px;
    line-height: 20px;

    .login-left {
        width: calc(100% - 470px);
        position: relative;
        background: url(https://cdn.myshopline.com/sl/admin/shopline-admin-login/202307040958/imgs/login_bg.3b819.jpeg)
            center / cover no-repeat;

        &:after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: block;
            background-color: rgba(36, 40, 51, 0.5);
            content: "";
        }
    }

    .login-right {
        width: 470px;
        display: flex;
        padding-top: 160px;
        justify-content: center;
        .logon-panel {
            width: 80%;
            h3 {
                margin-bottom: 32px;
                color: #262626;
                font-weight: 600;
                font-size: 30px;
                line-height: 42px;
            }
        }
    }
}
.login-form {
    .login-btn {
        width: 100%;
        color: #fff;
        font-weight: 600;
        line-height: 22px;
        white-space: normal;
        word-wrap: break-word;
        border: 0;
        box-shadow: none;
        height: auto;
        padding: 12px;
        border-radius: 4px;
    }

    .input-wrapper {
        border: 1px solid #d7dbe7;
        height: 52px;
        border-radius: 4px;
        background-color: #fff;

        .login-input {
            position: relative;
            width: 100%;
            height: 38px;
            border-radius: 4px;
            margin-top: 12px;

            input,
            :deep(.ant-input-password) {
                width: 100%;
                height: 100%;
                padding: 0 16px;
                border: none !important;
                box-shadow: none !important;
            }

            label {
                position: absolute;
                bottom: 14px;
                left: 16px;
                color: grey;
                pointer-events: none;
                transition: all 0.3s ease;
                z-index: 9;
            }

            input:focus ~ label,
            input:valid ~ label {
                transform: translateY(-15px);
                font-size: 12px;
            }
            .label-focus {
                transform: translateY(-15px);
                font-size: 12px;
            }
        }
        :deep(.ant-input-suffix) {
            position: relative;
            top: -3px;
        }
    }
    .input-wrapper-active {
        border-color: @hover-color;
        box-shadow: 0 0 0 2px rgba(13, 174, 175, 0.2);
    }
    .input-wrapper-error {
        border-color: #ff4d4f !important;
        box-shadow: none;
    }
    :deep(.ant-form-item-explain-error) {
        margin: 8px 0 20px;
    }
}

@media (max-width: 800px) {
    .login-left {
        display: none;
    }
    .login-right {
        width: 100vw !important;
        background: url(https://cdn.myshopline.com/sl/admin/shopline-admin-login/202307040958/imgs/login_bg.3b819.jpeg)
            center / cover no-repeat;
        .form-title {
            color: #fff !important;
        }
    }
}
</style>
