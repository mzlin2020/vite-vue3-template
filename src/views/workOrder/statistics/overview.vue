<template>
    <div class="over-view">
        <a-table :dataSource="showData" :columns="columns" :pagination="false" :scroll="{ y: 550 }" />
    </div>
</template>

<script setup>
/**
 * @description
 * @author
 * @version 0.0.1
 * @creatDate 2023/07/17
 */
import { useDebounceFn } from "@vueuse/core";
import { columns } from "./config/table.config";
import { mockData } from "./config/mock.config";

const data = ref([]);
const virtualList = reactive({
    start: 0,
    end: 15,
    count: 15,
    itemHeight: 55,
    scrollTop: 0,
    wrapperDom: null,
    contentDom: null,
});

const getDataList = async () => {
    data.value = await mockData(100, 100);
};
getDataList();

const showData = computed(() => data.value?.slice(virtualList.start, virtualList.end) || []);
watch(data, () => {
    // 确保data有数据，并且能够获取到DOM节点后初始化
    data.value.length && init();
});

const init = () => {
    virtualList.wrapperDom = document.querySelector(".ant-table-body");
    virtualList.contentDom = document.querySelector(".ant-table-body table");
    if (!virtualList.wrapperDom || !virtualList.contentDom) return;

    virtualList.wrapperDom.style.position = "relative";
    virtualList.wrapperDom.style.top = virtualList.wrapperDom.style.left = "0";
    virtualList.contentDom.style.position = "absolute";
    const limitScrollFn = useDebounceFn(handleScroll, 50);
    virtualList.wrapperDom.addEventListener("scroll", limitScrollFn);

    // 占位
    let isExist = document.querySelector(".palceholder-dom");
    if (isExist) return;
    const placeHolderDom = document.createElement("div");
    placeHolderDom.className = "palceholder-dom";
    virtualList.wrapperDom.appendChild(placeHolderDom);
    placeHolderDom.style.height = data.value.length * virtualList.itemHeight + "px";
};

const handleScroll = () => {
    virtualList.scrollTop = virtualList.wrapperDom.scrollTop;
    virtualList.start = Math.ceil(virtualList.wrapperDom.scrollTop / virtualList.itemHeight);
    virtualList.end = virtualList.start + virtualList.count + 10;
    virtualList.contentDom.style.top = virtualList.wrapperDom.scrollTop + "px";
};

watch(virtualList, (newVal) => {
    console.log(newVal);
});
</script>

<style lang="less" scoped></style>
