import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '#': resolve(__dirname, 'src'),
      '#layouts': resolve(__dirname, 'src/layouts'),
      '#components': resolve(__dirname, 'src/components'),
      '#services': resolve(__dirname, 'src/services'),
      '#routes': resolve(__dirname, 'src/routes'),
      '#pages': resolve(__dirname, 'src/pages'),
      '#publics': resolve(__dirname,'public'),
      '#utils': resolve(__dirname,'src/utils'),
      '#Helps': resolve(__dirname,'src/Helps'),
      '#hooks': resolve(__dirname,'src/hooks'),
    }
  },
  server:{
    //host:true,
    port:3000,
    // watch: {
    //         usePolling: true,
    //         interval: 100, 
    // }, // Dùng cho docker
    proxy: {
            '/api': {
                //target: 'http://app:5000', // Dùng cho docker
                target: 'https://roadmaphub.onrender.com', // Dùng cho local
                changeOrigin: true,
                secure: false,
            }
    }
  },
  preview: {
    host: '0.0.0.0', // 👈 cho phép Render truy cập
    port: 4173, // 👈 cổng preview (Render sẽ override bằng $PORT)
    allowedHosts: [
      'roadmaphub-2.onrender.com', // 👈 cho phép mọi subdomain Render (vd: roadmaphub-2.onrender.com)
    ],
  },
})
