# EasyMail

## 注意事项

**1、pnpm**

包管理工具推荐使用pnpm，相比较于npm、yarn优势明显，详情请查看https://juejin.cn/post/7121386382936768542

> 常见命令：
>
> 安装依赖：pnpm install
>
> 添加/移除依赖：pnpm add/remove


**2、lodash**

项目尽量少使用自己封装的函数，可能存在特殊情况未进行处理的风险。对于经常使用的`cloneDeep`，`isArray`等工具函数，全都在lodash中可以找到

>lodash官网：https://www.lodashjs.com/
