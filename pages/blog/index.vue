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
		<div class="split">
			<div class="breadcrumbs">
				<RouterLink to="/">~</RouterLink>
				<div class="separator">&#47;</div>
				<RouterLink to="/blog">blog</RouterLink>
				<div class="separator">&#47;</div>
			</div>
			<div class="right">
				<NuxtLink
					to="/rss.xml"
					target="_blank"
					aria-label="RSS feed"
					external
				>
					[rss]
				</NuxtLink>
			</div>
		</div>
		<h1>Latest posts</h1>
		<div class="articles">
			<NuxtLink
				v-for="article in articles"
				:key="article.path"
				:to="article.path"
			>
				<div
					class="article"
				>
					<NuxtImg
						v-if="article.meta.thumbnail"
						:src="`${article.path.slice(6)}/${article.meta.thumbnail as string}`"
						class="thumbnail"
						alt=""
					/>
					<div v-else class="div no-img">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 26"
							width="42"
							height="42"
							fill="none"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<!-- Page outline -->
							<path d="M4 2h10l6 6v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />

							<!-- Folded corner -->
							<path d="M13 3v5h6" />

							<!-- Text lines -->
							<line x1="6" y1="12" x2="15" y2="12" />
							<line x1="6" y1="16" x2="17" y2="16" />
							<line x1="6" y1="20" x2="14" y2="20" />
						</svg>
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
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped lang="scss">
.breadcrumbs {
	display: flex;
	align-items: center;
	gap: .4rem;
	font-size: 1.04rem;
	// margin-left: calc((100% - 900px) / 2);

	.back-btn {
		background-color: transparent;
		padding: 0;
	}

	.separator {
		color: #777;
	}

	.this-page {
		color: #aaa;
	}
}

.blog-index-page {
	max-width: 900px;
	margin: 0 auto;
	padding: 0 1.6rem;
	
	.split {
		font-size: 1.04rem;
		margin-top: 2rem;

		display: flex;
		justify-content: space-between;
		align-items: flex-center;
	}

	h1 {
		font-size: 2.4rem;
		font-weight: 600;
		margin-top: 4rem;
	}

	.article {
		position: relative;

		// border-left: 2px solid #333337;
		// padding-left: 1rem;
		margin-top: 1.2rem;
		display: flex;

		.no-img {
			width: 4rem;
			height: 4rem;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
		}

		.thumbnail {
			width: 4rem;
			height: 4rem;
			border-radius: .5rem;
			display: block;
			flex-shrink: 0;

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
		}

		.date {
			padding: 0;
			margin: 0;
			color: #aaa;
		}

		.summary {
			font-size: 1.04rem;
			margin: 0;
			margin-top: .2rem;
			color: #aaa;
		};
	}
}
</style>
