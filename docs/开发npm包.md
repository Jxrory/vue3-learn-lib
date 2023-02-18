# 开发 npm 包

## 编写 npm 包代码

先在 src 目录下创建一个名为 utils.ts 的文件，写入以下内容：

```ts
// src/utils.ts

/**
 * 生成随机数
 * @param min - 最小值
 * @param max - 最大值
 * @param roundingType - 四舍五入类型
 * @returns 范围内的随机数
 */
export function getRandomNumber(
  min: number = 0,
  max: number = 100,
  roundingType: "round" | "ceil" | "floor" = "round"
) {
  return Math[roundingType](Math.random() * (max - min) + min);
}

/**
 * 生成随机布尔值
 */
export function getRandomBoolean() {
  const index = getRandomNumber(0, 1);
  return [true, false][index];
}
```

utils.ts 文件已开发完毕，接下来需要将它导出的方法提供给包的使用者，请删除入口文件 src/index.ts 原来的测试内容，并输入以下新代码：

```ts
// src/index.ts
export * from "./utils";
```

接下来在命令行执行 npm run build ，再分别看看 dist 目录下的文件变化.

## 对 npm 包进行本地调试

开发或者迭代了一个 npm 包之后，不建议直接发布，可以在本地进行测试，直到没有问题了再发布到 npmjs 上供其他人使用。

### 创建本地软链接

```bash
# 创建 npm 包的本地软链接
npm link

# 查看全局安装的包
npm list -g
```

### 关联本地软链接

```bash
# 进入调试项目所在的目录
cd path/to/my-project

# 通过 npm 包的包名称关联本地软链接
npm link jxrory-vue3-learn-lib
```

### 使用关联包

```ts
// 请将 `jxrory-vue3-learn-lib` 更换为实际的包名称
import { getRandomNumber } from "jxrory-vue3-learn-lib";

const num = getRandomNumber();
console.log(num);
```

## 添加版权注释

很多知名项目在 Library 文件的开头都会有一段版权注释，它的作用除了声明版权归属之外，还会告知使用者关于项目的主页地址、版本号、发布日期、 BUG 反馈渠道等信息。

**安装插件**:

```bash
npm i -D vite-plugin-banner
```

根据插件的文档建议，打开 vite.config.ts 文件，将其导入，并通过读取 package.json 的信息来生成常用的版权注释信息：

```ts
// vite.config.ts
import { defineConfig } from "vite";
// 导入版权注释插件
import banner from "vite-plugin-banner";
// 导入 npm 包信息
import pkg from "./package.json";

// https://cn.vitejs.dev/config/
export default defineConfig({
  // 其他选项保持不变
  // ...
  plugins: [
    // 新增 banner 插件的启用，传入 package.json 的字段信息
    banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
    ),
  ],
});
```

## 参考

- [https://vue3.chengpeiquan.com/plugin.html](https://vue3.chengpeiquan.com/plugin.html)
