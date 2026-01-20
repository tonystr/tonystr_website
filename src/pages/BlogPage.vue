<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

type Article = {
	name: string;
	displayName?: string;
	password?: string;
	thumbnail?: string;
	timestamp?: any;
	summary?: string;
	tags?: string[];
}

const articles = ref<Article[]>([]);

onBeforeMount(async () => {
	let res = await fetch('/data/blog/articles.json')
		.then(res => res.json());
	articles.value = res;
});

const filteredArticles = computed(() => articles.value.filter(a => !a?.password));
</script>

<template>
	<div class="blog-index-page">
		<div class="breadcrumbs">
			<a href="/">~</a>
			<div class="separator">&#47;</div>
			<a href="/blog">blog</a>
			<div class="separator">&#47;</div>
			<div class="this-page">{{ route.params.article }}</div>
		</div>
		<h1>Latest posts</h1>
		<div class="articles">
			<a
				v-for="article in filteredArticles"
				:key="article.name"
				:href="`/blog/${article.name}`"
			>
				<div
					class="article"
				>
					<img
						v-if="article.thumbnail"
						class="thumbnail"
						:src="`/data/blog/${article.name}/${article.thumbnail}`"
						alt=""
						@error="($event.target as HTMLOrSVGImageElement).classList.add('error')"
					>
					<div class="right">
						<div class="top">
							<h2 class="title">
								{{ article.displayName ?? article.name }}
							</h2>
							<p class="date">
								{{ article.timestamp }}
							</p>
						</div>
						<p
							class="summary"
							v-if="article.summary"
						>
							{{ article.summary }}
						</p>
					</div>
				</div>
			</a>
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
	margin-top: 2rem;

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

	h1 {
		font-size: 2.4rem;
		font-weight: 600;
		margin-top: 4rem;
	}

	.article {
		position: relative;

		border-left: 2px solid #333337;
		padding-left: 1rem;
		margin-top: 1.2rem;
		display: flex;

		.thumbnail {
			width: 4rem;
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
