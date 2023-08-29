import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from "@vitejs/plugin-vue-jsx";

// import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const resolve = (dir: string) => path.join(__dirname, dir)

export default defineConfig({
  // base: 'https://lzt-cartoon.oss-cn-shenzhen.aliyuncs.com/dist/',
  base: './',
  plugins: [vue(), [vueJsx(), { optimize: true }],
  AutoImport({
    imports: ["vue", "vue-router"],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.t\?js$/],
    resolvers: [ElementPlusResolver()],
    dts: './auto-imports.d.ts',
  }),
  Components({
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.t\?js$/],
    resolvers: [ElementPlusResolver()],
    dts: true,
  }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: resolve('src/components'),
      api: resolve('src/api'),
      views: resolve('src/views'),
      utils: resolve('src/utils'),
      routes: resolve('src/routes'),
      styles: resolve('src/styles'),
      model: path.resolve(__dirname, 'src/model'),
      store: path.resolve(__dirname, 'src/store'),
    },
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`,
      },
      less: {
        math: 'parens-division',
      },
    },
    modules: {
      localsConvention: 'camelCase'
    }

  },
  server: {
    open: true,
    port: 8084,
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://127.0.0.1:7003/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
