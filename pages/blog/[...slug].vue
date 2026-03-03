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
		<Nav>
			<template v-slot:right>
				<NuxtTime
					v-if="data?.date"
					:datetime="data.date"
					year="numeric"
					month="short"
					day="2-digit"
					class="date"
				/>
			</template>
		</Nav>
		<div class="banner-wrapper">
			<img
				v-if="data?.meta.banner"
				:src="`/${articleSlug}/${data.meta.banner as string}`"
				class="article-banner"
				alt=""
			>
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
			<Nav>
				<template v-slot:right>
					<NuxtTime
						v-if="data?.date"
						:datetime="data.date"
						year="numeric"
						month="short"
						day="2-digit"
						class="date"
					/>
				</template>
			</Nav>
		</footer>
	</div>
</template>

<style scoped lang="scss">
footer {
	padding-bottom: 7rem;
	border-top: 2px solid #333;
	width: 900px;
	margin: 0 auto;
	margin-top: 8rem;
	padding-top: 0rem;
	height: 1px;

	@media (max-width: 900px) {
		width: 100%;
	}
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

.banner-wrapper {
	display: flex;

}

.article-banner {
	margin: 0 auto;
	width: 900px;
	max-height: 13rem;
	object-fit: cover;
	object-position: center;
	margin-top: 2rem;
	margin-bottom: -2rem;
	border-radius: 1rem;
}
</style>
