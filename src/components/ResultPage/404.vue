<template>
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
        <template #extra>
            <a-button type="primary" @click="backHome">Back Home</a-button>
        </template>
    </a-result>
</template>

<script setup>
/**
 * @description 404页面
 * @author 
 * @version 0.0.1
 * @creatDate 2023/07/10
 */

import { useRouter } from "vue-router";

const router = useRouter();
const backHome = () => {
    router.push("/");
};
</script>

<style lang="less" scoped></style>
