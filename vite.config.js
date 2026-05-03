import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    cssInjectedByJsPlugin()
  ],
  root: '.',
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'ChatbotWidget',
      fileName: () =>'widget.js',
      formats: ['iife']
    }
    }
  }
)
