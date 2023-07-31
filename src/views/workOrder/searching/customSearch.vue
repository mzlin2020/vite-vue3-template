<template>
    <div class="custom-searching">
        customSearching 测试
        <a-input v-model:value="value"></a-input>
    </div>
</template>

<script setup>
/**
 * @description
 * @author
 * @version 0.0.1
 * @creatDate 2023/07/14
 */
const value = ref("");

onUnmounted(() => {
    console.log("销毁了");
});

onActivated(() => {
    console.log("组件激活了");
});
</script>

<style lang="less" scoped>
.custom-searching {
    padding: 0 24px;
}
</style>
