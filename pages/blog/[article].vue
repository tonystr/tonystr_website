<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';
import markdownItHighlight from 'markdown-it-highlight';
import { useRoute } from 'vue-router';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useBlogStore } from '@/stores/blog';
import TableOfContents from '@/components/BlogTableOfContents.vue';

const tocContents = ref([]);

const route = useRoute();
const blogStore = useBlogStore();
const articleContent = blogStore.useArticle(route.params.article as string);

const markdown = computed(() => articleContent.text);
const srcRewrite = computed(() => `/data/blog/${route.params.article}/`);

const markdownRoot = ref<null | HTMLDivElement>(null);

function renderMediaCards(md: any) {
	md.renderer.rules.image = (tokens: any, index: any) => {
		const token = tokens[index];
		const src = token.attrGet('src').replace(/^\.\//, srcRewrite.value);
		const alt = token.content || '';

		if (!src) {
			return;
		}

		if (src && src.endsWith('.mp4')) {
			return `
				<div class="gif md-hover-gif">
					<video loop>
						<source src="${src}" type="video/mp4">
						${alt}
					</video>
				</div>
			`;
		} else if (/\.png$|\.jpg$|\.jpeg$|\.webp$/.test(src)) {
			return `
				<div class="image">
					<img src="${src}" alt="${alt}">
				</div>
			`;
		}
	}
}

const plugins = [
	markdownItHighlight,
	renderMediaCards,
];

watch([markdownRoot, markdown], ([mdRoot, md], [_, oldMd]) => {
	if (!mdRoot) {
		return;
	}

	console.log('====== triggered watch');
	console.log(`md: ${md.slice(0, 40)}`);

	if (md != oldMd) {
		console.log('md changed:');
		console.log(`old: ${oldMd ? oldMd.slice(0, 40) : oldMd}\n\n, new: ${md.slice(0, 40)}`);
	}

	renderExtensions(mdRoot);

	const observer = new MutationObserver(mutations => {
		for (const mutation of mutations) {
			// @ts-ignore
			for (const node of mutation.addedNodes) {
				renderExtensions(node);
			}
		}
	});
	observer.observe(mdRoot, { childList: true, subtree: true });
});

function renderExtensions(node: HTMLElement) {
	// videos
	const nodes = Array.from(node.querySelectorAll('.md-hover-gif'));
	for (const noder of nodes) {
		const node = noder as HTMLVideoElement;
		const video = node.querySelector('video');
		node.addEventListener('mouseenter', () => {
			node.classList.add('hovering');
			video.play();
		});
		node.addEventListener('mouseleave', () => {
			node.classList.remove('hovering')
			video.pause();
		});
	}

	// codeblocks
	const codeBlocks = Array.from(node.querySelectorAll('pre')) as HTMLPreElement[];
	for (const codeBlock of codeBlocks) {
		const addLineRegex = /^(?:<span class="hljs-comment">)\/\*add\*\/(?:<\/span>)(.*)$/gm;
		codeBlock.innerHTML = codeBlock.innerHTML.replace(addLineRegex, '<span class="code-add-line">$1</span>');
		codeBlock.innerHTML = codeBlock.innerHTML.replace('<span class="code-add-line"></span>', '<span class="code-add-line"> </span>');
	}

	// headings
	const headings = Array.from(node.querySelectorAll('h2')) as HTMLHeadingElement[];
	for (const heading of headings) {
		const title = heading.innerText.trim();
		heading.id = title;
		tocContents.value.push({
			text: title,
			level: 1,
			ttt: title,
		});

		// TODO: only scrollintoview the first time the content loads, not on all rerenders
		if (`#${title}` === route.hash) {
			heading.scrollIntoView({ behavior: 'instant', block: 'start' });
		}
	}
}

onBeforeMount(() => {
	if (articleContent.metadata?.title) {
		document.title = `${articleContent.metadata.title} | TonyStr's blog`;
	}
});

watch(articleContent, content => {
	if (content.metadata?.title) {
		document.title = `${content.metadata.title} | TonyStr's blog`;
	}
});

</script>

<template>
	<div class="blog-article">
		<TableOfContents
			:contents="tocContents"
			current="hashing"
		/>
		<div class="split">
			<div class="breadcrumbs">
				<RouterLink to="/">~</RouterLink>
				<div class="separator">&#47;</div>
				<RouterLink to="/blog">blog</RouterLink>
				<div class="separator">&#47;</div>
				<div class="this-page">{{ route.params.article }}</div>
			</div>
			<div class="right">
				<div class="meta">
					<div v-if="articleContent.metadata?.timestamp" class="date">
						{{articleContent.metadata.timestamp}}
					</div>
				</div>
				<a
					href="/rss.xml"
					target="_blank"
					aria-label="RSS feed"
				>
					[rss]
				</a>
			</div>
		</div>
		<div v-if="markdown === null">Loading...</div>
		<div
			class="markdown-root"
			ref="markdownRoot"
		>
			<VueMarkdown
				v-if="markdown !== null"
				class="rendered-markdown theme-atom-one-dark"
				:source="markdown"
				:plugins="plugins"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.blog-article .split {
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

.rendered-markdown {
	max-width: 900px;
	font-size: 1.1rem;
	margin: 0 auto;
	line-height: 1.7;
	padding: 0 1.6rem;
	padding-bottom: 12rem;
	margin-top: 5rem;
	color: #dbdadf;

	:deep(blockquote) {
		border-left: 3px solid #42a;
		margin-left: 0;
		padding-left: 2rem;
	}

	:deep(h1) {
		margin-bottom: 2.6rem;
		font-size: 3rem;
	}

	:deep(table) {
		width: 900px;
		overflow-x: hidden;

		@media(max-width: 800px) {
			width: 85vw;

			th video, th .gif {
				width: 40vw !important;
			}
		}

		th {
			.gif,
			video {
				width: 400px !important;
			}
		}
	}

	:deep(.image) {
		width: 700px;
		margin: 0 auto;
		padding: 1rem 0;

		img {
			width: 700px;
			margin: 0 auto;
			border-radius: .6rem;
			display: block;
		}

		@media(max-width: 800px) {
			width: 85vw;

			img {
				width: 85vw;
			}
		}
	}

	:deep(.gif) {
		width: 700px;
		margin: 0 auto;
		padding: 1rem 0;
		transition: transform .2s;

		&:hover {
			transform: scale(1.06);
		}

		video {
			width: 700px;
			border-radius: .6rem;
		}

		@media(max-width: 800px) {
			width: 85vw;

			video {
				width: 85vw;
			}
		}
	}
	
	:deep(pre) {
		background-color: #1e1e22;
		padding: .6rem 1rem;
		border-radius: .4rem;
		color: #aaaab1;
		overflow-x: scroll;
		tab-size: 4;

		> code {
			padding: 0;
			background-color: transparent;
			border-radius: 0;
			color: inherit;
		}
	}

	:deep(code) {
		background-color: #303036;
		padding: .2rem .3rem;
		border-radius: .4rem;
		color: #aaaab1;
	}

	:deep(.hljs) {
		color:#abb2bf;
		// background:#282c34

		.hljs-comment,
		.hljs-quote {
			color:#5c6370;
			font-style:italic
		}
		.hljs-doctag,
		.hljs-formula,
		.hljs-keyword {
			color:#c678dd
		}
		.hljs-deletion,
		.hljs-name,
		.hljs-section,
		.hljs-selector-tag,
		.hljs-subst {
			color:#e06c75
		}
		.hljs-literal {
			color:#56b6c2
		}
		.hljs-addition,
		.hljs-attribute,
		.hljs-meta .hljs-string,
		.hljs-regexp,
		.hljs-string {
			color:#98c379
		}
		.hljs-attr,
		.hljs-number,
		.hljs-selector-attr,
		.hljs-selector-class,
		.hljs-selector-pseudo,
		.hljs-template-variable,
		.hljs-type,
		.hljs-variable {
			color:#d19a66
		}
		.hljs-bullet,
		.hljs-link,
		.hljs-meta,
		.hljs-selector-id,
		.hljs-symbol,
		.hljs-title {
			color:#61aeee
		}
		.hljs-built_in,
		.hljs-class .hljs-title,
		.hljs-title.class_ {
			color:#e6c07b
		}
		.hljs-emphasis {
			font-style:italic
		}
		.hljs-strong {
			font-weight:700
		}
		.hljs-link {
			text-decoration:underline
		}
		.code-add-line {
			background-color: #004a30;
			display: inline-block;
			margin: 0;
			width: 100%;
			position: relative;

			&::before {
				content: '+';
				color: #aaffbb;
				position: absolute;
				left: -1rem;
				background-color: #004a30;
				padding-left: .3rem;
				padding-right: .1rem;
			}

			&::after {
				content: ' ';
				color: #aaffbb;
				position: absolute;
				right: -1rem;
				background-color: #004a30;
				padding-left: 1rem;

			}
		}
	}
}

</style>
