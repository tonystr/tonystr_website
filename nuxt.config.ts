export default defineNuxtConfig({
	compatibilityDate: '2026-01-30',

	$production: {
		routeRules: {
			'/blog': { cors: true, prerender: true, isr: true },
			'/blog/**': { cors: true, prerender: true, isr: true },
		}
	},
	$development: {
	},
	$env: {
		staging: {
		}
	},

	site: {
		url: 'https://tonystr.net',
		name: 'TonyStr.net'
	},

	content: {
		// This is needed for hosting on vercel!!!
		experimental: { sqliteConnector: 'native' },
		build: {
			markdown: {
				highlight: {
					theme: 'kanagawa-wave',
					langs: [
						'rust',
						'javascript',
						'js',
						'typescript',
						'ts',
						'bash',
						'sh',
						'shell',
						'markdown',
						'json',
						'java',
						'c',
						'cs',
					],
				}
			},
		}
	},

	typescript: {
		sharedTsConfig: {
			"extends": "./.nuxt/tsconfig.json",
			"compilerOptions": {
				"baseUrl": ".",
				"paths": {
					"@/*": ["./src/*"]
				}
			},
			"exclude": ["node_modules", "dist"]
		},
	},

	css: [
		'~/assets/style.css',
		'~/assets/fonts/inter.css'
	],

	modules: ['@pinia/nuxt', '@nuxt/content', '@nuxt/image', '@nuxtjs/sitemap'],

	app: {
		head: {
			title: 'TonyStr.net',
			htmlAttrs: {
				lang: 'en',
			},
			link: [
				{ rel: "alternate", title: "TonyStr's blog", type: "application/rss+xml", href: "/rss.xml" },
				{ rel: "icon", type: "image/x-icon", href: "/favicon.ico", },
				{ rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png", },
				{ rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png", },
			],
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
				{ name: 'description', content: 'Personal home page of Tony' },
				{ name: 'robots', content: 'index, follow' },
				// { name: 'msvalidate.01', content: '' },
				{ property: 'og:title', content: 'TonyStr.net' },
				{ property: 'og:description', content: 'Personal home page of Tony' },
				{ property: 'og:site_name', content: 'TonyStr' },
				// { property: 'og:image', content: '' },
				// { name: 'twitter:card', content: '' },
				{ name: 'twitter:title', content: 'TonyStr.net' },
				{ name: 'twitter:description', content: 'Personal home page of Tony' },
				// { name: 'twitter:image', content: '' },
				{ name: 'msapplication-TileColor', content: '#13121b' },
				{ name: 'theme-color', content: '#13121b' }
			]
		}
	}
});
