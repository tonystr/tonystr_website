<script setup lang="ts">
const route = useRoute();
const breadcrumbs = route.path.split('/').filter(crumb => crumb !== '');
const indexPage = route.path.endsWith('/');

// @ts-ignore
useJsonld({
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			item: 'https://tonystr.net/',
		},
		...breadcrumbs.map((crumb, i) => ({
			'@type': 'ListItem',
			position: i + 2,
			name: crumb,
			item: `https://tonystr.net/${breadcrumbs.slice(0, i + 1).join('/')}`
		}))
	]
});
</script>

<template>
	<div class="split">
		<nav class="breadcrumbs" aria-label="Breadcrumb">
			<ol>
				<li>
					<RouterLink to="/">~</RouterLink>
				</li>
				<li
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
				</li>
				<li><div v-if="indexPage" class="separator" aria-hidden="true" role="presentation" /></li>
			</ol>
		</nav>
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
	align-items: center;
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
	margin-left: 0;

	> ol {
		display: flex;
		align-items: center;
		gap: .4rem;
		list-style: none;
		padding-left: 0;

		li {
			display: flex;
			align-items: center;
			gap: .4rem;
			list-style: none;
		}
	}

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
