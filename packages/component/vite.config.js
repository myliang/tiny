import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    lib: {
      name: 'tiny-component',
      entry: 'src/index.ts',
      fileName: 'tiny-component',
    },
    rollupOptions: {
      output: {
        exports: 'named', // Explicitly tell Rollup you're using named exports
      },
    },
  },
});
