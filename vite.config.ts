import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'


// https://vitejs.dev/config/
export default defineConfig({
  // app: {
  //   head: {
  //     link: [
  //       { rel: "icon", type: "image/png", href: "/assets/images/favicon.png" },
  //     ],
  //     charset: "utf-8",
  //     viewport: "width=device-width, initial-scale=1",
  //     title: "Jupiter | Home",
  //   },
  // },
  plugins: [
    vue(),
    VueI18nPlugin({
      runtimeOnly: false,
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**')
    }),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './federation': './src/federation.ts'
      }
    })
  ],
  build: {
    assetsInlineLimit: 40960,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        format: 'esm',
        minifyInternalExports: false
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
