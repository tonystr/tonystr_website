<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
	<div class="page-wrapper">
		<Analytics />
		<NuxtLoadingIndicator />
		<NuxtPage />
	</div>
</template>

<style scoped lang="scss">
</style>
