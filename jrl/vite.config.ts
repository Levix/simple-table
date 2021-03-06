import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],
	test: {
		globals: true,
		coverage: {
			enabled: true
		},
		environment: 'jsdom',
		transformMode: {
			web: [/.[tj]sx$/]
		}
	}
})
