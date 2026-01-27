<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface Content {
    text: string;
    level: number;
    ttt: string;
}

const props = defineProps<{
    contents: Content[];
    current: string;
}>();

const router = useRouter();
const copyboxValue = ref('test');
const copybox = ref<HTMLTextAreaElement | null>(null);

function getLiClass(content: Content) {
	return {
		title: content.level === 1,
		current: content.text === props.current,
		comments: content.text === 'Comments',
	};
};

const scrollToContent = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const innerText = target.innerText.trim();
	const node = document.getElementById(innerText);
    if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'start' });
		router.push(`#${innerText}`);
    }
};

const generateURL = (event: MouseEvent) => {
    const linkElement = (event.currentTarget as HTMLElement).previousElementSibling;
    if (copybox.value && linkElement) {
        const linkText = (linkElement.textContent || '').replace(/\s+/g, '_');
        copybox.value.value = `${window.location.href.split('#')[0]}#${linkText}`;
        copybox.value.readOnly = true;
        copybox.value.focus();
        copybox.value.select();
        try {
            document.execCommand('copy');
        } catch (e) {
            console.error('Failed to copy URL', e);
        }
    }
};
</script>

<template>
	<aside
		v-if="contents && contents.length"
		id="table-of-contents"
	>
		<ul>
			<li
				v-for="content in contents"
				:key="content.text"
				:class="getLiClass(content)"
			>
				<span class="link" @click="scrollToContent">{{ content.text }}</span>
				<span class="link-icon" @click="generateURL($event)"><i class="fas fa-link" /></span>
			</li>
		</ul>
		<textarea ref="copybox" :value="copyboxValue" readonly />
	</aside>
</template>

<style lang="scss" scoped>
$c_dark: #222;
$c_gray: #0b0b0c;
$c_ltgray: #777;
$c_green: #2a3;
$c_txt: #dfdfe6;

#table-of-contents {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    color: $c_txt;
    pointer-events: none;
    width: calc(50% - 30rem);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media(max-width: 82rem) {
        display: none;
        opacity: 0;
        visibility: hidden;
    }

    ul {
        list-style-type: none;
        padding-left: .8rem;
        margin: 0;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 1.6rem;
            background: linear-gradient(90deg, transparent 0%, $c_gray 100%);
        }
    }

    textarea {
        position: absolute;
        left: -9999px;
        top: -9999px;
        opacity: 0;
        width: 1px;
        height: 1px;
        pointer-events: none;
    }

    li {
        margin-bottom: .6rem;
        padding-left: 1.4rem;
        margin-left: 1rem;
        pointer-events: all;
        position: relative;
        transition: .2s all;
		cursor: pointer;

        i {
            color: transparent;
            opacity: 0;
            visibility: hidden;
            margin-left: .6rem;
            transition: .2s all;
        }

        span.link {
            display: inline-block;
        }
        
        .link-icon {
             display: inline-block;
        }

        &.current:not(.title) {
            color: $c_green;

            &::before {
                border-color: $c_dark;
                background-color: transparent;
            }
        }

        &::before {
            transition: .2s all;
            content: '';
            position: absolute;
            width: .5rem;
            height: .5rem;
            display: inline-block;
            border-radius: 50%;
            background-color: $c_dark;
            border: 3px solid $c_gray;
            left: 0;
            top: calc(50% - .25rem - 1px);
        }

        &.title {
            margin-bottom: .65rem;
            font-size: 1.1rem;
            font-weight: 600;
            height: 1.6rem;
			text-wrap: nowrap;
			color: #656471;
        }

		&:hover {
			color: #dfdfe5;

			i {
				color: $c_ltgray;
				opacity: 1;
				visibility: visible;
			}

			&::before {
				background-color: transparent;
				border-color: #7591d4;
			}
		}
    }
}
</style>
