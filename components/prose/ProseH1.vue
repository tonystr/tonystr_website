<script setup lang="ts">
const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h2)))
</script>

<template>
	<h1 :id="props.id">
		<a
			v-if="props.id && generate"
			:href="`#${props.id}`"
		>
			<slot />
		</a>
		<slot v-else />
	</h1>
</template>

<style scoped lang="scss">
h1 {
	font-weight: 700 !important;
	color: #dbdadf;
	font-size: 3rem;
	margin-top: 5rem;
	margin-bottom: 3rem;

	a {
		font-weight: 700 !important;
		color: #dbdadf;
	}
}
</style>
