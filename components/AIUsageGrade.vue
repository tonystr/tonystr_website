<script setup lang="ts">
const props = defineProps<{
	grade: string
}>();

const split = props.grade.split('-');

type ContentGrade = 'AA' | 'A' | 'B' | 'C' | 'D';
type PeripheralGrade = 'I' | 'D' | 'E' | 'P';

const contentGrade = split[0] as ContentGrade;
const peripherals: PeripheralGrade[] = [];

if (split.length > 1) {
	const p = split[1] as string;
	peripherals.push(...p.split('') as PeripheralGrade[]);
}

const contentGradeMap = {
	'AA': 'No AI used for content',
	'A': 'AI used for proofreading',
	'B': 'AI used for langauge improvements',
	'C': 'AI used for drafting',
	'D': 'Content is entirely AI generated',
};

const peripheralsMap = {
	'I': 'AI used for infrastructure',
	'D': 'AI used for design',
	'E': 'AI used for ideating',
	'P': 'AI used for peripherals',
};

</script>

<template>
	<div class="aiug-grade">
		<span class="aiug-label">AIUG:</span> {{ grade }}

		<div class="hover-info">
			<p class="title">AI Usage Grade</p>
			<p><span class="letter">{{ contentGrade }}</span> - {{ contentGradeMap[contentGrade] }}</p>
			<p v-for="peripheral in peripherals">
				<span class="letter">{{ peripheral }}</span> - {{ peripheralsMap[peripheral] }}
			</p>

			<a href="https://tonystr.net/blog/ai_usage_grading">Learn more here</a>
		</div>
	</div> 
</template>

<style scoped>
.aiug-label                   { color: #a1a1a8; }
.aiug-grade                   { position: relative; }
.aiug-grade .hover-info       { display: none; }
.aiug-grade:hover .hover-info { display: flex; }

.hover-info {
	position: absolute;
	top: calc(100%);
	left: calc(50%);
	transform: translateX(-50%);

	background-color: #17171b;
	border: 1px solid #2a2a2c;
	border-radius: .5rem;
	padding: .6rem 1rem;
	min-width: 14rem;
	flex-direction: column;
	gap: .4rem;
}

.hover-info .title        {
	font-weight: 600;
	text-align: center;
}

.hover-info p             { margin: 0; }
.hover-info .letter       { font-weight: 600; }
</style>
