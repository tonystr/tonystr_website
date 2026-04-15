import { defineCollection, defineContentConfig } from '@nuxt/content';
import { defineSitemapSchema } from '@nuxtjs/sitemap/content';
import { z } from 'zod';

export default defineContentConfig({
	collections: {
		blog: defineCollection({
			type: 'page',
			source: 'blog/**/*.md',
			schema: z.object({
				date: z.string(),
				sitemap: defineSitemapSchema({
					name: 'blog',
					filter: (entry) => {
						if (entry.draft)
							return false
						if (entry.date && new Date(entry.date) > new Date())
							return false
						return true
					},
				}),
			})
		}),
	},
});
