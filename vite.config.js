import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/main/index.html'),
        home: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'src/pages/product/index.html'),
        register: resolve(__dirname, 'src/pages/register/index.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
        cart: resolve(__dirname, 'src/pages/cart/index.html'),
        detail: resolve(__dirname, 'src/pages/detail/index.html'),
        address: resolve(__dirname, 'src/pages/address/index.html'),
        header: resolve(__dirname, 'src/components/header/index.html'),
        footer: resolve(__dirname, 'src/components/footer/index.html'),
      },
    },
  },
});
