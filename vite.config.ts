import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          codemirror: [
            '@codemirror/commands',
            '@codemirror/lang-markdown',
            '@codemirror/state',
            '@codemirror/view'
          ],
          markdown: ['markdown-it'],
          icons: ['lucide-react']
        }
      }
    }
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts']
  }
});
