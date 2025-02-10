import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@api': path.resolve(__dirname, './src/api'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@store': path.resolve(__dirname, './src/store'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  build: {
    outDir: './build',
    rollupOptions: {
      output: {
        chunkFileNames: 'index-[hash].js',
        manualChunks: {
          mui: ['@mui/material'],
          'react-dropzone': ['react-dropzone'],
          'react-hook-form': ['react-hook-form'],
          'react-json-pretty': ['react-json-pretty'],
          'react-window': ['react-window'],
          zod: ['zod'],
        },
      },
    },
  },
});
