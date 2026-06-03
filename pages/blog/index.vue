<script setup lang="ts">
const { data: articles } = await useAsyncData(
	'blog_index', 
	() => queryCollection('blog')
		// Exclude articles starting with underscore
		.where('path', 'NOT LIKE', '/blog/%/_%')
		.order('date', 'DESC')
		.all(),
);

const keyboardSelected = ref(-1);

function toIsoDate(value: string | Date | undefined) {
	if (!value) {
		return undefined;
	}

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return undefined;
	}

	return date.toISOString();
}

function handleKeypress(e: KeyboardEvent) {
	if (/^\d$/.test(e.key)) {
		// TODO: Clamp this
		keyboardSelected.value = +e.key - 1;
		return;
	}

	if (e.ctrlKey || e.metaKey || e.altKey) {
		return;
	}

	switch (e.key) {
		case 'j':
		case 'Down':
			if (articles.value && keyboardSelected.value < articles.value.length - 1) { 
				keyboardSelected.value += 1;
			}
			break;

		case 'k':
		case 'Up':
			if (keyboardSelected.value >= 0) {
				keyboardSelected.value -= 1;
			}
			break;

		case 'Enter':
		case 'o':
		case 'l':
			const article = articles.value?.at(keyboardSelected.value);
			if (article) {
				navigateTo(article.path);
			}
			break;

		case 'h':
		case '~':
		case '-':
			navigateTo('/');
			break;
	}
}

useSeoMeta({
	title: 'TonyStr\'s blog',
	description: 'Latest posts from TonyStr. Subscribe on RSS',
});

useJsonld(() => ({
	'@context': 'https://schema.org',
	'@type': 'Blog',
	name: 'TonyStr\'s blog',
	description: 'Latest posts from TonyStr. Subscribe on RSS',
	url: 'https://tonystr.net/blog',
	author: {
		'@type': 'Person',
		name: 'Tony Strømsnæs',
	},
	blogPost: (articles.value ?? []).map((article) => ({
		'@type': 'BlogPosting',
		headline: article.title ?? article.path,
		url: `https://tonystr.net${article.path}`,
		datePublished: toIsoDate(article.date),
		description: article.description ?? `Read ${article.title ?? 'this post'} on TonyStr's blog.`,
	})),
}));

onMounted(() => { document.body.addEventListener('keydown', handleKeypress); });
onUnmounted(() => { document.body.removeEventListener('keydown', handleKeypress); });
</script>

<template>
	<div class="blog-index-page">
		<header>
			<Nav />
		</header>
		<p class="keyboard-hint">
			Navigate with <code>j</code>/<code>k</code> or <code>Up</code>/<code>Down</code>. Open page with <code>Enter</code>/<code>o</code>/<code>l</code>. Go back with <code>-.</code> Return to home page with <code>h</code>/<code>~</code>.
		</p>
		<h1>Latest posts</h1>
		<div class="articles">
			<NuxtLink
				v-for="(article, i) in articles"
				:key="article.path"
				:to="article.path"
				class="article-link"
				:class="{ 'keyboard-select': keyboardSelected === i }"
			>
				<article
					class="article"
				>
					<NuxtImg
						v-if="article.meta.thumbnail"
						:src="`${article.path.slice(6)}/${article.meta.thumbnail as string}`"
						class="thumbnail"
						alt=""
					/>
					<div v-else-if="article.meta.emoji" class="div no-img">
						{{ article.meta.emoji }}
					</div>
					<div v-else class="div no-img no-img-default">
						📄
					</div>
					<div class="right">
						<div class="top">
							<h2 class="title">
								{{ article.title ?? article.path }}
							</h2>
							<p class="date">
								<NuxtTime
									v-if="article.date"
									:datetime="article.date"
									year="numeric"
									month="short"
									day="2-digit"
									class="date"
								/>
							</p>
						</div>
						<p
							class="summary"
							v-if="article.description"
						>
							{{ article.description }}
						</p>
					</div>
				</article>
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped lang="scss">
.blog-index-page {
	max-width: 900px;
	margin: 0 auto;
	padding: 0 1.6rem;

	.keyboard-hint {
		font-style: italic;
		color: #8a8a8a;
		margin-top: 4rem;

		code {
			background-color: #3e3e3e;
			color: #bbc;
			padding: 1px 4px;
			margin: 0 1px;
			border-radius: 6px;
		}

		@media (max-width: 800px) {
			display: none;
		}
	}
	
	h1 {
		font-size: 2.2rem;
		font-weight: 600;
		margin-top: 2rem;
	}

	.article-link:nth-child(odd) .article {
		background-color: #1e1e1e;
		border-radius: .5rem;

		&:hover {
			background-color: #2a2a2a;
		}
	}

	.article-link:first-child .article {
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
	}

	.article-link:last-child .article {
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
	}

	.article-link.keyboard-select .article {
		background-color: #3d3c40;
	}

	.article {
		position: relative;
		display: flex;
		padding: .5rem 1.2rem;
		margin: .2rem 0;
		padding-left: .8rem;
		border-radius: .5rem;
		transition: outline, opacity, transform .14s;
		align-items: center;

		&:hover {
			background-color: #2a2a2a;
			transform: translateX(.6rem);

			.title {
				color: #fff !important;
			}
		}

		&:active {
			transform: scale(.98);
			opacity: .8;
		}

		.no-img {
			width: 4rem;
			height: 4rem;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
			color: #7a7a7f;
			font-size: 2rem;
		}

		.thumbnail {
			width: 4rem;
			height: 4rem;
			border-radius: .5rem;
			display: block;
			flex-shrink: 0;
			transform: scale(.74);

			&.error {
				opacity: 0;
			}
		}

		.right {
			flex-grow: 1;
			margin-left: 1rem;
		}

		h2 {
			margin: 0;
			margin-right: 1rem;
			font-weight: 500;
		}

		.top {
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;

			.title {
				color: #eee;
				font-size: 1.2rem;
			}
		}

		.date {
			padding: 0;
			margin: 0;
			color: #7a7a7a;
		}

		.summary {
			font-size: 1rem;
			margin: 0;
			margin-top: .2rem;
			color: #7a7a7a;
			font-style: italic;
		};

		@media(max-width: 900px) {
			font-size: .8rem;

			.title {
				font-size: 1.1rem;
			}

			.summary {
				font-size: .8rem;
				display: none;
			}
		}
	}

	@media(max-width: 900px) {
		padding: 0 .8rem;

		h1 {
			font-size: 1.8rem;
			text-align: center;
		}
	}
}
</style>
