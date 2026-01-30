<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'

const props = defineProps({
	src: {
		type: String,
		default: '',
	},
	alt: {
		type: String,
		default: '',
	},
	width: {
		type: [String, Number],
		default: undefined,
	},
	height: {
		type: [String, Number],
		default: undefined,
	},
})

// const mediaType = 'image';
// const refinedSrc = './';

const route = useRoute();
const videoRegex = /\.mp4$|\.gif$/;
const imageRegex = /\.png$|\.jpe?g$|\.gif$|\.webp$/;
const mediaType = computed(() => {
	if (props.src) {
		if (videoRegex.test(props.src)) {
			return 'video';
		}

		if (imageRegex.test(props.src)) {
			return 'image';
		}
	}

	return 'other';
});

const refinedSrc = computed(() => {
	if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
		const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
		if (_base !== '/' && !props.src.startsWith(_base)) {
			return joinURL(_base, props.src)
		}
	}

	if (props.src?.startsWith('./')) {
		const path = route.path.split('/').at(-1);
		// const path = '/git_immitation/'
		if (!path || typeof path !== 'string') {
			console.error(`failed to parse path for proseimg: ${path}`);
			return props.src;
		}
		return joinURL(path, props.src)
	}
	return props.src
})
</script>

<template>
	<NuxtImg
		v-if="mediaType === 'image'"
		:src="refinedSrc"
		:alt="props.alt"
		:width="props.width"
		:height="props.height"
	/>
	<video
		v-else-if="mediaType === 'video'"
		loop
		:width="props.width"
		:height="props.height"
		@mouseenter="event => (event?.target as HTMLVideoElement).play()"
		@mouseleave="event => (event?.target as HTMLVideoElement).pause()"
	>
		<source :src="`/${refinedSrc}`" type="video/mp4">
		{{ props.alt }}
	</video>
	<slot v-else />
</template>

<style scoped lang="scss">
img {
	width: 700px;
	margin: 2.6rem auto;
	border-radius: .6rem;
	display: block;

	@media(max-width: 800px) {
		width: 85vw;

		img {
			width: 85vw;
		}
	}
}


video {
	width: 700px;
	display: block;
	margin: 1.6rem auto;
	transition: transform .2s;
	border-radius: .6rem;

	&:hover {
		transform: scale(1.06);
	}

	@media(max-width: 800px) {
		width: 85vw;

		video {
			width: 85vw;
		}
	}
}
</style>
