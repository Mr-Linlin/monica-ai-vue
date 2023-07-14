import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
      apis: resolve('src/apis'),
      views: resolve('src/views'),
      utils: resolve('src/utils'),
      routes: resolve('src/routes'),
      styles: resolve('src/styles')

    }
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

  },
  server: {
    open: true,
    port: 8084,
    proxy: {
      // 选项写法
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: path => path.replace()
      }
    }
  }
})
