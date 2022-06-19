import { defineConfig } from 'vitest/config'
const path = require('path')
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

function resolve(dir) {
	return path.join(__dirname, dir)
}

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
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src')
			}
		]
	}
})
