import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rewrite-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // If the request doesn't start with /api and looks like a page route (even with dots)
          if (req.url && !req.url.startsWith('/api') && req.url.startsWith('/app/')) {
            req.url = '/index.html';
          }
          next();
        });
      }
    }
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    },
    watch: {
      ignored: ['**/public/apps/**']
    }
  }
})
