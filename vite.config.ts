// vite.config.ts
import { defineConfig } from 'vite'
// 导入版权注释插件
import banner from 'vite-plugin-banner'
// 导入 npm 包信息
import pkg from './package.json'

// https://cn.vitejs.dev/config/
export default defineConfig({
  build: {
    // 输出目录
    outDir: 'dist',
    // 构建 npm 包时需要开启 “库模式”
    lib: {
      // 指定入口文件
      entry: 'src/index.ts',
      // 输出 UMD 格式时，需要指定一个全局变量的名称
      name: 'learn-lib',
      // 最终输出的格式，这里指定了三种
      formats: ['es', 'cjs', 'umd'],
      // 针对不同输出格式对应的文件名
      fileName: (format) => {
        switch (format) {
          // ES Module 格式的文件名
          case 'es':
            return 'index.mjs'
          // CommonJS 格式的文件名
          case 'cjs':
            return 'index.cjs'
          // UMD 格式的文件名
          default:
            return 'index.min.js'
        }
      },
    },
    // 压缩混淆构建后的文件代码
    minify: true,
  },

  plugins: [
    // 新增 banner 插件的启用，传入 package.json 的字段信息
    banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`
    ),
  ],
})
