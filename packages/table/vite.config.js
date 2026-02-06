import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    outDir: 'dist',
    sourcemap: false,
    lib: {
      name: 'tiny-table',
      entry: 'src/index.ts',
      fileName: 'tiny-table',
    },
    rollupOptions: {
      output: {
        exports: 'named', // Explicitly tell Rollup you're using named exports
      },
    },
  },
});
