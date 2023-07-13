<template>
    <h1>{{ obj }}</h1>
</template>

<script setup>
import { ref } from "vue";
defineProps({
    msg: String,
});

const obj = {
    name: "111",
    age: "222",
};
</script>

<style scoped lang="less">
h1 {
    color: @test;
}
</style>
