# EasyMail

## 注意事项

**1、pnpm**

包管理工具推荐使用pnpm，相比较于npm、yarn优势明显，详情请查看https://juejin.cn/post/7121386382936768542

> 常见命令：
>
> 安装依赖：pnpm install
>
> 添加/移除依赖：pnpm add/remove

**2、tailwindcss**

可复用样式处理方案，专注于解决统一变量维护的困难，尽可能多地使用该方案可减少css的编写与打包体积

使用方式

```html
<div class="flex bg-gray-500 bottom-1">
    content
</div>
```

> 推荐安装vscode提示插件：Tailwind CSS IntelliSense
>
> 更多类名及其代表样式请从官网直接搜索：https://www.tailwindcss.cn/

**3、lodash**

项目尽量少使用自己封装的函数，可能存在特殊情况未进行处理的风险。对于经常使用的`cloneDeep`，`isArray`等工具函数，全都在lodash中可以找到

>lodash官网：https://www.lodashjs.com/
