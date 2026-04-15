<script setup lang="ts">
const route = useRoute();
const breadcrumbs = route.path.split('/').filter(crumb => crumb !== '');
const indexPage = route.path.endsWith('/');
</script>

<template>
	<div class="split">
		<div class="breadcrumbs">
			<RouterLink to="/">~</RouterLink>
			<template
				v-for="(crumb, i) in breadcrumbs"
				:key="i"
			>
				<div class="separator" aria-hidden="true" role="presentation" />
				<RouterLink
					:to="`/${breadcrumbs.slice(0, i + 1).join('/')}`"
					class="crumb"
				>
					{{ crumb }}
				</RouterLink>
			</template>
			<div v-if="indexPage" class="separator" aria-hidden="true" role="presentation" />
		</div>
		<div class="right">
			<slot name="right" />
			<NuxtLink
				to="/rss.xml"
				target="_blank"
				aria-label="RSS feed"
				external
			>
				[rss]
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped lang="scss">
.split {
	font-size: 1.04rem;
	margin: 0 auto;
	margin-top: 2rem;
	max-width: 900px;

	display: flex;
	justify-content: space-between;
	align-items: flex-center;
	flex-wrap: wrap;

	@media(max-width: 950px) {
		margin-left: 1.6rem;
		margin-right: 1.6rem;
	}

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
	max-width: 100%;

	.back-btn {
		background-color: transparent;
		padding: 0;
	}

	.separator::before {
		content: '/';
		color: #777;
		user-select: none;
	}

	.this-page {
		color: #aaa;
	}

	.crumb:last-child {
		text-overflow: ellipsis;
		overflow: hidden;
	}
}

</style>
