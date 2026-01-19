<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import IconPlanetDash from './IconPlanetDash.vue';

const cursorBlob = ref<null | HTMLDivElement>(null);

watch(cursorBlob, (cursorBlob) => {
	if (cursorBlob === null) {
		return;
	}

	document.body.addEventListener('mousemove', (e) => {
		cursorBlob.animate({
			left: `${e.clientX - 400}px`,
			top: `${e.clientY - 400}px`,
		}, { duration: 7000, fill: 'forwards' });
	});
});

onMounted(() => {
	document.body.style.overflow = 'hidden';
});
onUnmounted(() => {
	document.body.style.overflow = '';
});
</script>

<template>
	<div className="home">
		<div className="planet-container">
			<h1 className="main-heading">
				<span>T</span>
				<span>o</span>
				<span>n</span>
				<span>y</span>
				&nbsp;
				<span>S</span>
				<span>t</span>
				<span>r</span>
				<span>ø</span>
				<span>m</span>
				<span>s</span>
				<span>n</span>
				<span>æ</span>
				<span>s</span>
			</h1>
			<IconPlanetDash className="planet" />
		</div>
		<div
			className="cursor-blob"
			:data-loaded="cursorBlob !== null"
			ref="cursorBlob"
		/>
		<div className="blur-bg" />
	</div>
</template>

<style scoped lang="scss">
.home {
	margin: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: 100%;
	height: 100vh;
	overflow: hidden;
}

.planet-container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: relative;
	width: 100%;

	&::before {
		content: '';
		width:  800px;
		height: 800px;
		position: absolute;
		z-index: -8000;
		background: #18141f;
		border-radius: 50%;
		animation: blob 9s infinite;
		bottom: -400px;
	}

	.planet {
		z-index: -7000;
		display: block;
		filter: drop-shadow(0 0 1rem #18141f);
		position: relative;

		@media (max-width: 481px) {
			width: 600px;
		}
	}
}

@keyframes text-load-in {
	from {
		transform: scaleY(0);
	}
	to {
		transform: scaleY(1);
	}
}

.main-heading {
	font-size: 1.3rem;
	color: #fff;
	text-align: center;
	background: #171717;
	padding: .8rem 1.6rem;
	font-weight: normal;
	border-radius: .6rem;
	position: absolute;
	top: -2rem;
	border: 1px solid #232428;

	@media (max-width: 481px) {
		top: 2rem;
	}

	span {
		display: inline-block;
		animation: text-load-in .14s;

		@for $i from 1 through 14 {
			&:nth-child(#{$i}) {
				animation-delay: calc(0.05s * $i);
			}
		}

	}
}

.cursor-blob {
	top: -800px;
	left: 200px;
	width:  800px;
	height: 800px;
	position: absolute;
	z-index: -8000;
	background: #18141f;
	border-radius: 50%;
	animation: blob 14s infinite;
	bottom: 0;
	animation-delay: 5s;
}

.blur-bg {
	position: absolute;
	inset: 0;
	z-index: -7500;
	backdrop-filter: blur(400px);
}

@keyframes blob {
	0% {
		transform: scale(1);
		opacity: 1;
	}
	25% {
		transform: scale(1.2) rotate(130deg) scaleX(.8);
		opacity: .7;
	}
	50% {
		transform: scale(1.1) rotate(-80deg) scaleX(.9);
		opacity: 1;
	}
	75% {
		transform: scale(.9) rotate(110deg) scaleX(.6);
		opacity: .6;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}
</style>
