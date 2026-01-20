<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';
import markdownItHighlight from 'markdown-it-highlight';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref, watch } from 'vue';

const route = useRoute();

const markdown = ref<null | string>(null);
const srcRewrite = ref('/data/');
const markdownRoot = ref<null | HTMLDivElement>(null);

const plugins = [
	markdownItHighlight,
	renderMediaCards,
];

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

onBeforeMount(async () => {
	srcRewrite.value = `/data/blog/${route.params.article}/`;
	const res = await fetch(`/data/blog/${route.params.article}/index.md`)
		.then(res => res.text());
	markdown.value = res;
});

watch(markdownRoot, (mdRoot) => {
	if (!mdRoot) {
		return;
	}

	const observer = new MutationObserver(mutations => {
		for (const mutation of mutations) {
			// @ts-ignore
			for (const node of mutation.addedNodes) {
				const nodes = node.querySelectorAll('.md-hover-gif');
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
			}
		}
	});
	observer.observe(mdRoot, { childList: true, subtree: true });
});

</script>

<template>
	<div class="blog-article">
		<div class="breadcrumbs">
			<a href="/">~</a>
			<div class="separator">&#47;</div>
			<a href="/blog">blog</a>
			<div class="separator">&#47;</div>
			<div class="this-page">{{ route.params.article }}</div>
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
.breadcrumbs {
	display: flex;
	align-items: center;
	gap: .4rem;
	font-size: 1.04rem;
	margin-left: calc((100% - 900px) / 2);
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

.rendered-markdown {
	max-width: 900px;
	font-size: 1.1rem;
	margin: 0 auto;
	padding-bottom: 12rem;
	line-height: 1.6;
	padding: 0 1.6rem;

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
	}
}

</style>
