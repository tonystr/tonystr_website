<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';
import markdown from '@/data/blog/regex.md?raw';
import markdownItHighlight from 'markdown-it-highlight';
import 'markdown-it-highlight/dist/index.css';

const plugins = [markdownItHighlight];
</script>

<template>
	<div class="blog-article">
		<VueMarkdown
			class="rendered-markdown theme-atom-one-dark"
			:source="markdown"
			:plugins="plugins"
		/>
	</div>
</template>

<style scoped lang="scss">
.rendered-markdown {
	max-width: 900px;
	font-size: 1.1rem;
	margin: 0 auto;
	padding-bottom: 4rem;
	line-height: 1.6;
	
	::v-deep(pre) {
		// border: 3px solid #303036;
		background-color: #303036;
		padding: .6rem 1rem;
		border-radius: .4rem;
		color: #aaaab1;

		> code {
			padding: 0;
			background-color: transparent;
			border-radius: 0;
			color: inherit;
		}
	}

	::v-deep(code) {
		background-color: #303036;
		padding: .2rem .3rem;
		border-radius: .4rem;
		color: #aaaab1;
	}

	::v-deep {
		.hljs {
			color:#abb2bf;
			// background:#282c34
		}
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
