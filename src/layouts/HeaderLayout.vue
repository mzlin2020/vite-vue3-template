<template>
    <div class="header-layout">
        <div class="header-wrapper">
            <div class="header-left"></div>
            <div class="header-right">
                <a-popover
                    trigger="click"
                    :getPopupContainer="(triggerNode) => triggerNode.parentNode"
                    :destroyTooltipOnHide="true"
                    v-model:visible="isShowMenu1"
                >
                    <div class="dropdown workbench">客服工作台</div>
                    <template #content>
                        <a-menu @click="handleActions">
                            <a-menu-item v-for="item in workbenchOptions" :key="item.key">
                                <span class="iconfont workbench-icon" v-html="item.icon"></span>
                                <span>{{ item.label }}</span>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-popover>

                <a-popover
                    trigger="click"
                    :getPopupContainer="(triggerNode) => triggerNode.parentNode"
                    :destroyTooltipOnHide="true"
                    v-model:visible="isShowMenu2"
                >
                    <div class="dropdown user-info">
                        <img src="@/assets/images/admin.png" alt="" />
                        <span class="user-name">zm</span>
                    </div>
                    <template #content>
                        <a-menu @click="handleActions">
                            <a-menu-item v-for="item in userOptions" :key="item.key">{{ item.label }}</a-menu-item>
                        </a-menu>
                    </template>
                </a-popover>
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * @description
 * @author
 * @version 0.0.1
 * @creatDate 2023/07/12
 */
import { useLoginStore } from "@/store/modules/login";
const { logoutAction } = useLoginStore();
const isShowMenu1 = ref(false);
const isShowMenu2 = ref(false);

const workbenchOptions = [
    { label: "在线客服工作台", key: "online-workbench", icon: "&#xe690;" },
    { label: "呼叫客服工作台", key: "call-workbench", icon: "&#xe644;" },
];

const userOptions = [
    { label: "个人设置", key: "settings" },
    { label: "在线接入客服测试", key: "service-test" },
    { label: "退出", key: "logout" },
];

const handleActions = ({ key }) => {
    switch (key) {
        case "online-workbench":
            console.log("在线客服工作台");
            break;
        case "call-workbench":
            console.log("呼叫客服工作台");
            break;
        case "settings":
            console.log("个人设置");
            break;
        case "service-test":
            console.log("在线接入客服测试");
            break;
        default:
            logoutAction();
            break;
    }
    isShowMenu1.value = false;
    isShowMenu2.value = false;
};
</script>

<style lang="less" scoped>
.header-layout {
    position: absolute;
    top: 0;
    z-index: @header-zindex;
    width: 100%;
    height: @header-height;
    line-height: @header-height;
    border-bottom: 1px solid #eff3fa;
}

.header-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    height: 100%;
    .header-right {
        display: flex;
        align-items: center;
        margin-right: 10px;
        .workbench,
        .user-info {
            cursor: pointer;
            user-select: none;
        }

        .user-info {
            margin-right: 33px;
            display: flex;
            align-items: center;
            img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
        .workbench {
            margin-right: 40px;
        }

        .dropdown {
            position: relative;
            color: #161616;
            height: 17px;
            line-height: 17px;
            &:after {
                position: absolute;
                content: "";
                width: 0;
                height: 0;
                border: 4px solid transparent;
                border-top-color: #4f4e4e;
                top: 7px;
                right: -15px;
            }
        }
        :deep(.ant-popover-inner-content) {
            padding: 10px 2px;
            min-width: 120px;
            user-select: none;
            .ant-menu {
                border-right: none;
                .ant-menu-item {
                    padding: 7px 14px;
                    margin: 0;
                    height: 36px;
                    line-height: 36px;
                    display: flex;
                    align-items: center;
                    &:hover {
                        color: #222;
                        background-color: #f5f5f5;
                    }
                }
                .ant-menu-item-selected {
                    background-color: #f5f5f5;
                    color: #222;
                }

                .workbench-icon {
                    position: relative;
                    top: 2px;
                    margin-right: 10px;
                    color: black;
                }
            }
        }
    }
}
</style>
