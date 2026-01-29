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

const route = useRoute();
const videoRegex = /\.mp4$|\.gif$/;
const mediaType = computed(() => props.src && videoRegex.test(props.src) ? 'video' : 'image');

const refinedSrc = computed(() => {
	if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
		const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
		if (_base !== '/' && !props.src.startsWith(_base)) {
			return joinURL(_base, props.src)
		}
	}

	if (props.src?.startsWith('./')) {
		const path = route.path.split('/').at(-1);
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
	<div :class="mediaType">
		<NuxtImg
			v-if="mediaType === 'image'"
			:src="refinedSrc"
			:alt="props.alt"
			:width="props.width"
			:height="props.height"
		/>
		<div
			v-else-if="mediaType === 'video'"
			class="gif md-hover-gif"
		>
			<video
				loop
				:width="props.width"
				:height="props.height"
				@mouseenter="event => (event?.target as HTMLVideoElement).play()"
				@mouseleave="event => (event?.target as HTMLVideoElement).pause()"
			>
				<source :src="`/${refinedSrc}`" type="video/mp4">
				{{ props.alt }}
			</video>
		</div>
		<div v-else class="error">
			Failed to load media
		</div>
	</div>
</template>

<style lang="scss">
.image {
	width: 700px;
	margin: 0 auto;
	padding: 1rem 0;

	img {
		width: 700px;
		margin: 0 auto;
		border-radius: .6rem;
		display: block;
	}

	@media(max-width: 800px) {
		width: 85vw;

		img {
			width: 85vw;
		}
	}
}

.gif {
	width: 700px;
	margin: 0 auto;
	padding: 1rem 0;
	transition: transform .2s;

	&:hover {
		transform: scale(1.06);
	}

	video {
		width: 700px;
		border-radius: .6rem;
	}

	@media(max-width: 800px) {
		width: 85vw;

		video {
			width: 85vw;
		}
	}
}
</style>
