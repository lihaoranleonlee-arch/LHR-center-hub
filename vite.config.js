import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = process.env.GITHUB_ACTIONS && repositoryName
  ? `/${repositoryName}/`
  : '/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        design: fileURLToPath(new URL('./design/index.html', import.meta.url)),
      },
    },
  },
});
