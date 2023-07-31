<template>
    <div class="screen-tip" v-if="visible">
        <div ref="screenTipModal" class="screen-tip-modal"></div>
        <a-modal
            :visible="visible"
            :footer="null"
            :closable="false"
            :style="{ width: '560px' }"
            centered
            :getContainer="() => $refs.screenTipModal"
            :maskStyle="{ backgroundColor: ' #000000a6' }"
            destroyOnClose
            :maskClosable="false"
        >
            <div>目前只支持电脑端，请复制登录链接到电脑端 Chrome 浏览器登录即可正常使用!</div>
            <div class="link">
                链接：
                <br />
                <a href="javascript:;">{{ link }}</a>
            </div>
            <a-button type="primary" class="copy-btn" @click="copy(link)">复制登录链接</a-button>
        </a-modal>
    </div>
</template>

<script setup>
/**
 * @description 屏幕缩放的提示框
 * @author 林泽明
 * @version 0.0.1
 * @creatDate 2023/07/21
 */
import { useWindowSize, useClipboard } from "@vueuse/core";
const { width } = useWindowSize();
const { copy } = useClipboard();

const visible = ref(false);

// 屏幕小于500，显示该组件
const isShowCurModal = (newVal) => {
    newVal < 500 ? (visible.value = true) : (visible.value = false);
};
watch(width, (newVal) => isShowCurModal(newVal));

// 复制
const link = ref("xxxxxxxxxxxxxxxxxx");
</script>

<style lang="less" scoped>
.screen-tip-modal {
    :deep(.ant-modal-body) {
        padding: 20px !important;
    }
    div:first-child {
        color: #424242;
        display: block;
        margin-bottom: 20px;
        text-align: center;
    }
    .link {
        display: block;
        font-size: var(--font-size-sm);
        color: #424242;
        text-align: center;
        margin-bottom: 20px;
    }
    .copy-btn {
        width: auto;
        display: block;
        margin: 0 auto;
    }
    :deep(.ant-btn-primary) {
        padding: 7px 16px;
        height: 36px;
        line-height: 20px;
        border-radius: 3px;
    }
}
</style>
