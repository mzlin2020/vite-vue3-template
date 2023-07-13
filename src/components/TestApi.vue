<template>
    <div class="">test comps</div>
</template>

<script setup>
/**
 * @description
 * @author
 * @version 0.0.1
 * @creatDate 2023/07/08
 */
import { onMounted } from "vue";
import { useUserStore } from "@/store/modules/user.js";

const userStore = useUserStore();
onMounted(() => {
    console.log(userStore.userInfo);
    userStore.updateUserInfo({ name: "sadasdsadsdsad", age: 22 });
});
</script>

<style lang="less" scoped></style>
