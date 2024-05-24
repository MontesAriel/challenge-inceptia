import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', 
    rollupOptions: {
      input: 'src/main.tsx', 
      output: {
        entryFileNames: 'main.js', 
        assetFileNames: 'main.css', 

      },
    },
    manifest: true,
  },
});
