import { defineStore } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import yaml from 'js-yaml';

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
	metadata: { [key: string]: any };
	loading: boolean;
	loaded: boolean;
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
				metadata: {},
				loading: true,
				loaded: false,
			};
		}
		const artRes = await fetch(`/data/blog/${name}/index.md`)
			.then(res => res.text());

		let content = artRes;
		let metadata = {};

		// parse metadata
		if (artRes.startsWith('---')) {
			let split = artRes.split('---', 3);
			metadata = yaml.load(split[1]);
			content = split[2];
		}

		// TODO: Error handling
		article.value[name].text = content;
		article.value[name].metadata = metadata;
		article.value[name].loading = false;
		article.value[name].loaded = true;
	}

	const prefetchArticleContent = async (name: string) => {
		const existing = article.value[name];
		if (existing && (existing.loaded || existing.loading)) {
			return;
		} 
		fetchArticleContent(name);
	}

	const useArticle = (name: string) => {
		const existing = article.value[name];
		if (existing && existing.loaded) {
			return existing;
		}

		fetchArticleContent(name);
		const newArticleContent = article.value[name];
		return newArticleContent;
	}

	return {
		articles,
		useArticle,
		fetchArticleContent,
		prefetchArticleContent,
	};
});
