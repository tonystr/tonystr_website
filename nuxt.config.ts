export default defineNuxtConfig({
	compatibilityDate: '2026-01-29',

	$production: {
		routeRules: {
			'/blog': { prerender: true, isr: true },
			'/blog/**': { prerender: true, isr: true },
		}
	},
	$development: {
	},
	$env: {
		staging: {
		}
	},

	content: {
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
						'markdown',
						'json',
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
		'~/src/index.css'
	],

	modules: [
		'@pinia/nuxt',
		'@nuxt/content',
		'@nuxt/image',
	],

	// hooks: {
	// 	'content:file:beforeParse': (ctx: any) => {
	// 		const { file } = ctx;
	// 		console.log('BEFORE PARSE');
	//
	// 		if (file.id.endsWith('.md')) {
	// 			file.body = file.body.replace(/^\/\*add\*\/(.*)$/gm, '<span class="code-add-line">$1</span>');
	// 		}
	// 	}
	// },

	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			},
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
				{ name: 'description', content: 'Personal home page of Tony' },
				{ name: 'robots', content: 'index, follow' },
				// { name: 'msvalidate.01', content: 'BF3CD10C85056390DBB5884682A1E8DE' },
				{ property: 'og:title', content: 'TonyStr.net' },
				{ property: 'og:description', content: 'Personal home page of Tony' },
				{ property: 'og:site_name', content: 'TonyStr' },
				// { property: 'og:image', content: 'https://soundshop.io/banner.png' },
				// { name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: 'TonyStr.net' },
				{ name: 'twitter:description', content: 'Personal home page of Tony' },
				// { name: 'twitter:image', content: 'https://soundshop.io/banner.png' },
				{ name: 'msapplication-TileColor', content: '#13121b' },
				{ name: 'theme-color', content: '#13121b' }
			]
		}
	}
});
