---
ai_grade: AA
date: 2026-03-16
---
# AI Usage Grading

Using AI to generate posts or responses intended for other humans to read, is a [breach of the social contract](https://distantprovince.by/posts/its-rude-to-show-ai-output-to-people/). The more effort has been put into a work, the harder it is to spot the use of AI. I believe people tend to be more respectful of content partially produced by AI if the author is upfront about the extent to which AI was used to aid with creating that content. Therefore, I've decided to create an AI-grading system that I will use to display how AI is used in my writing.

I was inspired to create this when I read [https://stopsloppypasta.ai/](https://stopsloppypasta.ai/), and commenters correctly [pointed out](https://news.ycombinator.com/item?id=47393278) that the website showed many signs of AI-generation. The author confirmed this to be true in response to the commenters, but never communicated it on the website.

For my system, I decided to use a grading scale based the alphabet, where earlier letters like A and B correspond to more human effort and less AI-input, while lower letters like C and D correspond to less human effort, and more AI involvement. 

* **AA** - No AI used at all
* **A** - AI only used for proofreading
* **B** - AI is used for language improvements
* **C** - AI used for drafting
* **D** - Output is entirely AI generated

Grade C implies that there is still some human effort involved in the output. This could be a combined effort of AI drafting and human drafting, resulting in a co-authored article between human and AI. Most of my articles will probably get grade A or B, as I tend to use writing as an aid for thinking, and I've never been a fan of working with templates (AI-generated drafts).

These gradings all correspond to the extent which the content of the post represents human thought and language. But it may also be useful to communicate if AI is used as peripheral help. This can include generating the website hosting the article, designing a brand/theme or creating icons/logos. I also sometimes discuss ideas with AI in order to develop them, before I even begin to write. I call this AI-for-ideating, and I think it's in good spirit to share this as well. I've created the following grade-modifiers:

* **I** - AI used for infrastructure
* **D** - AI used for design
* **E** - AI used for ideating
* **P** - AI used for other peripherals

Grade modifiers are separated from the content grade by a dash. If multiple modifiers apply, they are placed next to each other with no separator. For example: `C-ID`: AI used for drafting, infrastructure and design.

Of course, the extent to which AI was used for these peripheral objects could also be graded in their own full scale, but I think that adds more noise than necessary. When reading an article, the main thing that's interesting is to know how the content was generated. Therefore I think it suffices to say that I/D/E/P apply if at least 30% of their output is AI-generated. This is hard to objectively measure, but I'm not the AI police. I just want an easy-to-understand system for being transparent about AI usage.

Here is a simple vue component for displaying the AI usage grade with information on hover:

```vue
<script setup lang="ts">
/// License: Copy and modify at will. No attribution needed.
/// @author: tonystr (https://tonystr.net)
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

.hover-info .title {
	font-weight: 600;
	text-align: center;
}

.hover-info p       { margin: 0; }
.hover-info .letter { font-weight: 600; }
</style>
```

You can see it in action at the top-right of this page. I've also retroactively added gradings to all my previous articles.
