<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';

const cursorBlob = ref<null | HTMLDivElement>(null);

watch(cursorBlob, (cursorBlob) => {
	if (cursorBlob === null) {
		return;
	}

	cursorBlob.animate({
		left: `${window.innerWidth / 2 - 400}px`,
		top: `${0 - 400}px`,
	}, { duration: 0, fill: 'forwards' });

	document.body.addEventListener('mousemove', (e) => {
		cursorBlob.animate({
			left: `${e.clientX - 400}px`,
			top: `${e.clientY - 400}px`,
		}, { duration: 7000, fill: 'forwards' });
	});
});

onMounted(() => {
	document.body.style.overflow = 'hidden';
	document.body.style.width = '100vw';
	document.body.style.height = '100vh';
});
onUnmounted(() => {
	document.body.style.overflow = '';
	document.body.style.width = '';
	document.body.style.height = '';
});

useSeoMeta({
	title: 'TonyStr.net',
});
</script>

<template>
	<div class="home">
		<nav class="floating-nav">
			<div class="separator">·</div>
			<NuxtLink to="./blog">blog</NuxtLink>
			<div class="separator">·</div>
			<NuxtLink to="https://github.com/tonystr">github</NuxtLink>
			<div class="separator">·</div>
		</nav>
		<div class="planet-container">
			<h1 class="main-heading">
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
			<IconPlanetDash class="planet" />
		</div>
		<div
			class="cursor-blob"
			:data-loaded="cursorBlob !== null"
			ref="cursorBlob"
		/>
		<div class="blur-bg" />
		<div class="plus-tl">+</div>
		<div class="plus-bl">+</div>
		<div class="plus-tr">+</div>
		<div class="plus-br">+</div>
	</div>
</template>

<style scoped lang="scss">
$plus_hpad: 1rem;
$plus_vpad: .6rem;
$glow_color: #18141f;

.plus-tl,
.plus-bl,
.plus-tr,
.plus-br {
	font-size: 2.5rem;
	font-weight: 100;
	color: #666;
	user-select: none;
}

.plus-tl {
	position: absolute;
	top: $plus_vpad;
	left: $plus_hpad;
}

.plus-bl {
	position: absolute;
	bottom: $plus_vpad;
	left: $plus_hpad;
}

.plus-tr {
	position: absolute;
	top: $plus_vpad;
	right: $plus_hpad;
}

.plus-br {
	position: absolute;
	bottom: $plus_vpad;
	right: $plus_hpad;
}

.home {
	margin: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}

.floating-nav {
	position: fixed;
	display: flex;
	justify-content: center;
	gap: .8rem;
	$width: 11rem;
	top: 1rem;
	width: $width;
	left: calc(50% - $width / 2);
	text-align: center;
	padding: .3rem 0;
	border-radius: .4rem;
	background: #171717;
	border: 1px solid #232428;

	.separator {
		color: #777;
	}
}

.planet-container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: relative;
	width: 100%;
	padding-top: 10rem;

	&::before {
		content: '';
		width:  1000px;
		height: 1000px;
		position: absolute;
		z-index: -8000;
		background: $glow_color;
		border-radius: 50%;
		animation: blob 9s infinite;
		bottom: -400px;

		@media (max-width: 481px) {
			width: 600px;
			height: 600px;
		}
	}

	.planet {
		z-index: -7000;
		display: block;
		box-shadow: inset 0 0 38px #000 ;
		position: relative;
		border: 1px solid #000;
		border-radius: 50%;
		margin-bottom: -600px;

		@media (max-height: 1090px) {
			width: 1000px;
			height: 1000px;
		}

		@media (max-width: 481px) {
			margin-bottom: -800px;
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

	&::before {
		content: '';
		position: absolute;
		width: 2px;
		height: 16rem;
		background: linear-gradient(to bottom, #232428, #000);
		top: 1rem;
		left: calc(50% - 1px);
		z-index: -5;
	}

	@media (max-width: 481px) {
		top: 2rem;

		&::before {
			height: 12rem;
		}
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
	background: $glow_color;
	border-radius: 50%;
	animation: blob 14s infinite;
	bottom: 0;
	animation-delay: 5s;

	@media (max-width: 481px) {
		display: none;
	}
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
