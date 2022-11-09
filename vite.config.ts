import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';
import viteEslint from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制
    cssTarget: 'chrome61',
    lib: {
      entry: resolve('lib/index.ts'),
      name: 'my-lib',
      fileName: (format, name) => `${name}.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'react',
          'react-dom': 'react-dom'
        }
      }
    }
  },

  plugins: [
    react(),
    viteEslint(),
    // didn't work
    StylelintPlugin({
      // 对某些文件排除检查
      fix: true,
      quiet: true,
      include: [
        'src/**/*.css',
        'src/**/*.scss',
        'lib/**/*.css',
        'lib/**/*.scss'
      ]
    }),
    typescript({
      target: 'es5',
      rootDir: resolve('lib/'),
      declaration: true,
      declarationDir: resolve('dist'),
      exclude: resolve('node_modules/**'),
      allowSyntheticDefaultImports: true
    })
  ]
});
