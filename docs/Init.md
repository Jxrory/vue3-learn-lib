# 初始化项目

```bash
# 创建一个项目文件夹
mkdir vue3-learn-lib

# 进入项目文件夹
cd vue3-learn-lib

# 执行初始化，使其成为一个 Node 项目
npm init -y
```

## 配置包信息

```json
{
  // npm 包的名称
  "name": "jxrory-vue3-learn-lib",
  // npm 包的版本号
  "version": "0.1.0",
  // 描述
  "description": "A library demo for learning vue3 lib.",
  // 作者
  "author": "jxrory <jxrory@jxrory.com>",
  // 主页
  "homepage": "https://github.com/jxrory/vue3-learn-lib",
  // 仓库
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jxrory/vue3-learn-lib.git"
  },
  // 遵循协议
  "license": "MIT",
  // 指定发布到 npm 上的文件范围，格式为 string[] 支持配置多个文件名或者文件夹名称。
  "files": ["dist"],
  // 项目的入口文件，通常指向构建产物所在目录的某个文件，该文件通常包含了所有模块的导出。
  "main": "dist/index.cjs",
  // 当项目使用 import 引入 npm 包时对应的入口文件，通常指向一个 es 格式的文件，对应 ES Module 规范。
  "module": "dist/index.mjs",
  // 当项目使用了 npm 包的 CDN 链接，在浏览器访问页面时的入口文件，通常指向一个 umd 格式的文件，对应 UMD 规范。
  "browser": "dist/index.min.js",
  // 一个 .d.ts 类型声明文件，包含了入口文件导出的方法 / 变量的类型声明，如果项目有自带类型文件，那么在使用者在使用 TypeScript 开发的项目里，可以得到友好的类型提示
  "types": "dist/index.d.ts",
  // 关键词
  "keywords": ["library", "demo", "example"],
  // 执行脚本
  "scripts": {
    "build": "vite build"
  }
}
```

## 安装开发依赖

```bash
# 添加 -D 选项将其安装到 devDependencies
npm i -D vite
```

## 添加配置文件

```ts
// vite.config.ts
import { defineConfig } from "vite";

// https://cn.vitejs.dev/config/
export default defineConfig({
  build: {
    // 输出目录
    outDir: "dist",
    // 构建 npm 包时需要开启 “库模式”
    lib: {
      // 指定入口文件
      entry: "src/index.ts",
      // 输出 UMD 格式时，需要指定一个全局变量的名称
      name: "hello",
      // 最终输出的格式，这里指定了三种
      formats: ["es", "cjs", "umd"],
      // 针对不同输出格式对应的文件名
      fileName: (format) => {
        switch (format) {
          // ES Module 格式的文件名
          case "es":
            return "index.mjs";
          // CommonJS 格式的文件名
          case "cjs":
            return "index.cjs";
          // UMD 格式的文件名
          default:
            return "index.min.js";
        }
      },
    },
    // 压缩混淆构建后的文件代码
    minify: true,
  },
});
```

## 添加入口文件

```ts
// src/index.ts
export default function hello(name: string) {
  console.log(`Hello ${name}`);
}
```

在命令行执行 `npm run build` 命令，可以看到项目下生成了 dist 文件夹，以及三个 JavaScript 文件，此时目录结构如下：

```bash
vue3-learn-lib
│ # 构建产物的输出文件夹
├─dist
│ ├─index.cjs
│ ├─index.min.js
│ └─index.mjs
│ # 依赖文件夹
├─node_modules
│ # 源码文件夹
├─src
│ │ # 入口文件
│ └─index.ts
│ # 项目清单信息
├─package-lock.json
├─package.json
│ # Vite 配置文件
└─vite.config.ts
```

## 参考

- [https://vue3.chengpeiquan.com/plugin.html](https://vue3.chengpeiquan.com/plugin.html)
