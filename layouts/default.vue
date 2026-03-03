<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>
	<div class="page-wrapper">
		<Analytics />
		<SpeedInsights />
		<NuxtLoadingIndicator />
		<NuxtPage />
	</div>
</template>

<style scoped lang="scss">
</style>
