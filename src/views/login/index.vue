<template>
    <div class="login">
        <div class="login-left">
            <div class="logo-text">
                <p>欢迎来到</p>
                <div>logo</div>
            </div>
        </div>
        <div class="login-right">
            <div class="logon-panel">
                <h3>登录系统</h3>
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
                                <label> 邮箱/手机号 </label>
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

                    <a-form-item style="margin-bottom: 8px">
                        <a-button type="primary" class="login-btn" @click="login" ref="loginBtn">登 录</a-button>
                    </a-form-item>

                    <div class="forget-password">
                        <a @click="forgetPassword">忘记密码</a>
                    </div>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * @description 登录页面
 * @author 
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
    remember: true,
});
const formRef = ref(null);
const passwordRef = ref(null);
const userRef = ref(null);
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

const forgetPassword = () => {
    message.info("请联系系统管理员");
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

        .logo-text {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            margin-top: -3%;
            transform: translate(-50%, -50%);
            p {
                margin-bottom: 24px;
                color: #fff;
                font-weight: 300;
                font-size: 32px;
                font-family: Helvetica;
                line-height: 1;
            }
        }

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
        margin-top: 160px;
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
        border-color: #2bbdb8;
        box-shadow: 0 0 0 2px rgba(13, 174, 175, 0.2);
    }
    .input-wrapper-error {
        border-color: #ff4d4f !important;
        box-shadow: none;
    }
    :deep(.ant-form-item-explain-error) {
        margin: 8px 0 20px;
    }

    .forget-password {
        text-align: right;
        a {
            font-weight: 600;
        }
    }
}

@media (max-width: 800px) {
    .login-left {
        display: none;
    }
    .login-right {
        width: 100vw !important;
    }
}
</style>
