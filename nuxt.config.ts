// @ts-expect-error: vite-plugin-eslint has broken or missing types
import eslintPlugin from 'vite-plugin-eslint';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@pinia/nuxt',
  ],

  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    families: [
      { name: 'Roboto', provider: 'google' },
    ],
  },

  css: [
    '@/assets/global.css',
    '@/assets/theme.css',
    '@/assets/code.scss',
  ],

  vite: {
    plugins: [eslintPlugin({
      failOnWarning: false,
      failOnError: true,
      emitWarning: true,
      emitError: true,
    })],
  },
});