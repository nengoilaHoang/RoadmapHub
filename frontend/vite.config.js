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
      '#utils': resolve(__dirname,'src/utils')
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
                target: 'http://localhost:5000', // Dùng cho local
                changeOrigin: true,
                secure: false,
            }
    }
  }
})
