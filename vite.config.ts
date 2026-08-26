import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Browser calls /storentia-api/graphql -> Vite forwards it to the
      // real API server-side, sidestepping the browser's CORS check.
      '/storentia-api': {
        target: 'https://apis.storentia.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/storentia-api/, ''),
        configure: (proxy) => {
          proxy.on('error', (err, _req, res) => {
            console.error('[proxy error]', err);
            if (!res.headersSent) {
              res.writeHead(502, { 'Content-Type': 'application/json' });
            }
            res.end(JSON.stringify({ proxyError: err.message }));
          });
          proxy.on('proxyReq', (_proxyReq, req) => {
            console.log('[proxy] ->', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('[proxy] <-', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
