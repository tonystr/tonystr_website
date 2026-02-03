<script setup lang="ts">
import { useAsyncData } from 'nuxt/app';

const route = useRoute();
const { data } = await useAsyncData(
	() => `post:${route.path}`,
	() => queryCollection('blog')
		.path(route.path)
		.first()
);

const articleSlug = computed(() => route.params.slug?.[0]);

useSeoMeta({
	title: `${data.value?.title} | TonyStr's blog`,
	description: data.value?.description,
});
</script>

<template>
	<div class="blog-article-page">
		<div class="split">
			<div class="breadcrumbs">
				<NuxtLink to="/">~</NuxtLink>
				<div class="separator">&#47;</div>
				<NuxtLink to="/blog">blog</NuxtLink>
				<div class="separator">&#47;</div>
				<div class="this-page">{{ articleSlug }}</div>
			</div>
			<div class="right">
				<div class="meta">
					<NuxtTime
						v-if="data?.date"
						:datetime="data.date"
						year="numeric"
						month="short"
						day="2-digit"
						class="date"
					/>
				</div>
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
		<ContentRenderer
			v-if="data"
			class="rendered-markdown"
			:value="data"
		/>
		<div v-else class="page-not-found">
			<div class="code-404">404</div>
			Page not found
		</div>
		<footer>
			<div class="split">
				<div class="breadcrumbs">
					<NuxtLink to="/">~</NuxtLink>
					<div class="separator">&#47;</div>
					<NuxtLink to="/blog">blog</NuxtLink>
					<div class="separator">&#47;</div>
					<div class="this-page">{{ articleSlug }}</div>
				</div>
				<div class="right">
					<div class="meta">
						<NuxtTime
							v-if="data?.date"
							:datetime="data.date"
							year="numeric"
							month="short"
							day="2-digit"
							class="date"
						/>
					</div>
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
		</footer>
	</div>
</template>

<style scoped lang="scss">
.blog-article-page .split {
	font-size: 1.04rem;
	margin: 0 auto;
	margin-top: 2rem;
	max-width: 900px;

	display: flex;
	justify-content: space-between;
	align-items: flex-center;

	.right {
		display: flex;
		gap: 1.6rem;
		align-items: center;

		.date {
			color: #aaa;
		}

		a {
			display: block;
			align-self: center;
			padding-bottom: 3px;
		}
	}
}

.breadcrumbs {
	display: flex;
	align-items: center;
	gap: .4rem;
	font-size: 1.04rem;

	@media(max-width: 950px) {
		margin-left: 1.6rem;
	}

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

footer {
	padding-bottom: 7rem;
	border-top: 2px solid #333;
	width: 900px;
	margin: 0 auto;
	margin-top: 8rem;
	padding-top: 0rem;
	height: 1px;
}

.rendered-markdown {
	max-width: 900px;
	font-size: 1.1rem;
	margin: 0 auto;
	line-height: 1.7;
	padding: 0 1.6rem;
	margin-top: 5rem;
	color: #dbdadf;

	:deep(hr) {
		color: #333;
	}
}

.page-not-found {
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-size: 2rem;
	font-weight: 600;

	.code-404 {
		font-size: 5rem;
		font-weight: 800;
		margin-top: 8rem;
	}
}
</style>
