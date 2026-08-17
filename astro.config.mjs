import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
	site: 'https://ciuff.it',
	output: 'static',
	integrations: [sitemap()],
})
