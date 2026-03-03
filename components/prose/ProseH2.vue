<script setup lang="ts">
const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h2)))
</script>

<template>
	<h2 class="h2" :id="props.id">
		<div class="hash">#&nbsp;&nbsp;</div>
		<NuxtLink
			v-if="props.id && generate"
			:to="`#${props.id}`"
		>
			<slot />
		</NuxtLink>
		<slot v-else />
	</h2>
</template>

<style scoped lang="scss">
.h2 {
	font-weight: 700 !important;
	color: #dbdadf;
	position: relative;

	a {
		font-weight: 700 !important;
		color: #dbdadf;
	}

	.hash {
		position: absolute;
		right: 100%;
		opacity: 0;
		transition: opacity .14s;
		user-select: none;
	}

	&:hover {
		color: #fff;

		.hash {
			opacity: 1;
		}
	}
}
</style>
