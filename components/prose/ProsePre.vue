<script setup lang="ts">
const codeNode = ref<HTMLPreElement | null>(null);
onMounted(() => {
	if (!codeNode.value) {
		console.error("codeNode is not rendered yet");
		return;
	}
	const lines = Array.from(codeNode.value.querySelectorAll('span.line')) as HTMLSpanElement[];
	for (const line of lines) {
		if (line.innerText.startsWith('/*add*/')) {
			line.classList.add('code-add-line');
			line.innerHTML = line.innerHTML.replace('/*add*/', '');
		}
	}
});
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

	:deep(.code-add-line) {
		background-color: #004a30;
		display: block;
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
			top: 0;

		}
	}
}

</style>
