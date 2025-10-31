// Vite config with React plugin and test setup.
// Rationale:
// - Keep build fast and dev-friendly.
// - Test pool 'forks' sidesteps a node worker recursion issue observed in CI.
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    css: true,
    pool: 'forks',
  },
});

