import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import * as path from 'path'
dotenv.config()

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@(?=\/)/, replacement: path.resolve(__dirname, './src') },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
    __API_ENDPOINT__: JSON.stringify(process.env.API_ENDPOINT),
  },
  css: {
    devSourcemap: true,
  },
})
