<script setup lang="ts">
const { data: articles } = await useAsyncData(
	'blog_index', 
	() => queryCollection('blog')
		// Exclude articles starting with underscore
		.where('path', 'NOT LIKE', '/blog/%/_%')
		.order('date', 'DESC')
		.all(),
);

useSeoMeta({
	title: 'TonyStr\'s blog',
	description: 'Latest posts from TonyStr. Subscribe on RSS',
});
</script>

<template>
	<div class="blog-index-page">
		<header>
			<Nav />
		</header>
		<h1>Latest posts</h1>
		<div class="articles">
			<NuxtLink
				v-for="article in articles"
				:key="article.path"
				:to="article.path"
				class="article-link"
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
	
	h1 {
		font-size: 2.4rem;
		font-weight: 600;
		margin-top: 4rem;
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

	.article {
		position: relative;
		display: flex;
		padding: .5rem 1.2rem;
		margin: .2rem 0;
		padding-left: .8rem;
		border-radius: .5rem;
		transition: outline, opacity, transform .14s;

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
			font-size: 1.4rem;
			font-weight: 400;
		}

		.top {
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;

			.title {
				color: #eee;
			}
		}

		.date {
			padding: 0;
			margin: 0;
			color: #7a7a7a;
		}

		.summary {
			font-size: 1.04rem;
			margin: 0;
			margin-top: .2rem;
			color: #7a7a7a;
			font-style: italic;
		};
	}
}
</style>
