<template>
    <div class="sub-menu" v-if="isShow">
        <div class="header">
            <div class="level-1">{{ currentMenus.meta.title }}</div>
            <div class="refresh"><span class="iconfont">&#xe788;</span>刷新</div>
        </div>
        <div class="menu-control" v-if="currentMenus.children?.length">
            <div v-for="item in currentMenus.children" :key="item.name" class="item-cnotainer">
                <div class="level-2">{{ item.meta.title }}</div>
                <template v-if="item.children?.length">
                    <div v-for="child in item.children" :key="child.name" @click="selectMenu(child)">
                        <div :class="['level-3', 'ellipsis', isActive(child.path) ? 'active' : '']">
                            {{ child.meta.title }}
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * @description 子菜单组件
 * @author 林泽明
 * @version 0.0.1
 * @creatDate 2023/07/14
 */
import { useLoginStore } from "@/store/modules/login";
import { useUserStore } from "@/store/modules/user";
import _ from "lodash";
const { menus } = useLoginStore();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const ignoreRoutes = ["dashboard"]; //忽略不显示的组件
const isShow = computed(() => !ignoreRoutes.includes(route.name));

// ========================== 筛选menus ====================================
const filterMenus = (menus) => {
    const result = [];
    for (let menu of menus) {
        // 忽略隐藏、name为空的路由
        if (!menu.name || !menu.meta.isMenuShow) continue;
        if (menu.children?.length) {
            menu.children = filterMenus(menu.children);
        }
        result.push({ ...menu });
    }
    return result;
};
const allMenus = filterMenus(menus);
const currentMenus = computed(() => allMenus.find((item) => item.name === userStore.selectedKeys[0]));

// =============================== 二级菜单跳转 ==================================
const selectMenu = ({ name }) => {
    if (route.name === name) return;
    router.push({ name });
};
// 当前选中项
const isActive = computed(() => (path) => path === userStore.activeKey);
</script>

<style lang="less" scoped>
.sub-menu {
    height: calc(100% - @router-tabs-height);
    width: 210px;
    max-width: 210px;
    min-width: 210px;
    background: linear-gradient(90deg, #fff, #fff, #fff, #f3f6fd);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    user-select: none;

    .header {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 14px 20px 20px;
        width: 100%;
        .level-1 {
            font-size: 16px;
            font-weight: 700;
            line-height: 20px;
        }
        .refresh {
            color: #161616;
            cursor: pointer;
            .iconfont {
                font-size: 13px;
                margin-right: 4px;
            }
            &:hover {
                color: @hover-color;
                .iconfont {
                    color: @hover-color;
                }
            }
        }
    }

    .menu-control {
        flex: 1;
        overflow-y: auto;
        .item-cnotainer {
            margin-bottom: 20px;
            .level-2 {
                color: #161616;
                font-weight: 600;
                pointer-events: none;
                padding-left: 20px;
                margin-bottom: 4px;
            }
            .level-3 {
                position: relative;
                line-height: 34px;
                height: 34px;
                color: #343434;
                padding: 0 20px;
                cursor: pointer;
                &:hover {
                    background: rgba(226, 231, 239, 0.35);
                    color: @color;
                }
                &::after {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    border-right: 2px solid #0daeaf;
                    transform: scaleY(0.0001);
                    opacity: 0;
                    transition:
                        transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
                        opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
                    content: "";
                }
            }
            .active {
                background: rgba(226, 231, 239, 0.35) !important;
                color: @color !important;
                &::after {
                    transform: scaleY(1);
                    opacity: 1;
                    transition:
                        transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
                        opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
                }
            }
        }

        // 滚动条样式
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #e5ebf6;
            border-radius: 4px;
        }
    }
}
</style>
