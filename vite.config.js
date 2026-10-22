import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GSAP nemá v balíčku čisté ESM exporty pro Node, při předrenderování ho proto přibalíme
  ssr: { noExternal: ['gsap', '@gsap/react'] },
})
