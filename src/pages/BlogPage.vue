<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onBeforeMount, ref } from 'vue';

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
					<h2>{{ article.displayName ?? article.name }}</h2>
				</div>
			</a>
		</div>
	</div>
</template>

<style scoped lang="scss">
</style>
