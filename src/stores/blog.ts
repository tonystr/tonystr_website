import { defineStore } from 'pinia';
import { onBeforeMount, ref } from 'vue';

type ArticleMeta = {
	name: string;
	displayName?: string;
	password?: string;
	thumbnail?: string;
	timestamp?: any;
	summary?: string;
	tags?: string[];
};

type ArticleContent = {
	text: string | null;
	loading: boolean;
	success: boolean;
}

export const useBlogStore = defineStore('blog', () => {
	const articles = ref<ArticleMeta[]>([]);
	const article = ref<{ [key: string]: ArticleContent }>({});

	onBeforeMount(async () => {
		// Load metadata for listed articles
		const res = await fetch('/data/blog/articles.json')
			.then(res => res.json());
		articles.value = res;

		// Preload newest article
		const art = res[0].name;
		fetchArticleContent(art);
	});

	const fetchArticleContent = async (name: string) => {
		const existing = article.value[name];
		if (existing) {
			// Reload existing articlecontent
			existing.loading = true;
		} else {
			// Create new articlecontent
			article.value[name] = {
				text: null,
				loading: true,
				success: false,
			};
		}
		const artRes = await fetch(`/data/blog/${name}/index.md`)
			.then(res => res.text());
		// TODO: Error handling
		article.value[name].text = artRes;
		article.value[name].loading = false;
		article.value[name].success = true;
	}

	const useArticle = (name: string) => {
		const existing = article.value[name];
		if (existing) {
			console.log('Article already loaded.'); 
			return existing;
		}

		console.log('Article not loaded. Loading...');

		fetchArticleContent(name);
		const newArticleContent = article.value[name];
		return newArticleContent;
	}

	return {
		articles,
		useArticle
	};
});
