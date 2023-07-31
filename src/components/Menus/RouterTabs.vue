<template>
    <div class="router-tabs" v-if="isShow">
        <a-tabs
            v-model:activeKey="userStore.activeKey"
            type="line"
            @change="onTabsChanges"
            tabPosition="top"
            size="small"
            class="tab-container"
            :style="{ width: `${tabsWidth}px` }"
        >
            <a-tab-pane
                v-for="pane in userStore.routePaths"
                :key="pane.path"
                :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            >
                <template #tab>
                    {{ pane.title
                    }}<span :style="closeIconStyle" @click.stop="onRemoveTab(pane)" class="iconfont">&#xe7fc;</span>
                </template>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
/**
 * @description 历史路由记录组件
 * @author 林泽明
 * @version 0.0.1
 * @creatDate 2023/07/14
 */
import _ from "lodash";
import { useUserStore } from "@/store/modules/user";
import { sleep } from "@/utils/toolsFn";
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

// ================ ignore ================================

const ignoreRoutes = ["dashboard"]; //忽略不显示的组件
const isShow = computed(() => !ignoreRoutes.includes(route.name));

// ================= 处理tabs显示 ================================

const onRemoveTab = ({ path, name }) => {
    userStore.updateRoutePaths({ type: "remove", path, name });
};
const onTabsChanges = (activeKey) => {
    router.push({ path: activeKey });
};
const closeIconStyle = {
    display: "inline-block",
    fontSize: "10px",
    opacity: "0.8",
    paddingLeft: "4px",
    marginLeft: "4px",
    userSelect: "none",
};

// =================== a-tabs动态宽度 ==========================
const tabsWidth = ref(null);
const handleTabsWidth = async () => {
    await sleep(300);
    const el = document.querySelector("#sider-container");
    tabsWidth.value = window.innerWidth - el.getBoundingClientRect().width;
};
watch(() => userStore.collapsed, handleTabsWidth, { immediate: true });
</script>

<style lang="less" scoped>
.router-tabs {
    height: @router-tabs-height;
    background: #f6f7f9;
    :deep(.ant-tabs) {
        .ant-tabs-nav {
            margin: 0;
            .ant-tabs-tab {
                max-height: @router-tabs-height;
                margin: 0;
                padding: 6px 12px;
                border: none;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.85);
                background: transparent;
                user-select: none;
            }

            .ant-tabs-tab-active {
                background: #ebedf0;
                .ant-tabs-tab-btn {
                    color: rgba(0, 0, 0, 0.85);
                    text-shadow: none;
                }
            }
        }

        .ant-tabs-nav-operations {
            max-height: @router-tabs-height;
            align-items: center;
        }
    }
}
</style>
