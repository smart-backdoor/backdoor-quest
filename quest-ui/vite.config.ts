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
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@context': path.resolve(__dirname, './src/context'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  build: {
    outDir: './build',
    rollupOptions: {
      output: {
        chunkFileNames: 'index-[hash].js',
        manualChunks: {
          'dnd-kit': ['@dnd-kit/core', '@dnd-kit/sortable'],
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
