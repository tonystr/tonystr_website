<script setup lang="ts">
// const codeNode = ref<HTMLPreElement | null>(null);
// onMounted(() => {
// 	if (!codeNode.value) {
// 		console.error("codeNode is not rendered yet");
// 		return;
// 	}
// 	const codeBlocks = Array.from(codeNode.value.querySelectorAll('pre')) as HTMLPreElement[];
// 	for (const codeBlock of codeBlocks) {
// 		const addLineRegex = /^(?:<span class="hljs-comment">)\/\*add\*\/(?:<\/span>)(.*)$/gm;
// 		codeBlock.innerHTML = codeBlock.innerHTML.replace(addLineRegex, '<span class="code-add-line">$1</span>');
// 		codeBlock.innerHTML = codeBlock.innerHTML.replace('<span class="code-add-line"></span>', '<span class="code-add-line"> </span>');
// 	}
// });
</script>

<template>
	<pre ref="codeNode"><slot /></pre>
</template>

<style scoped lang="scss">
pre {
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
</style>
