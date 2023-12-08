<script lang="ts">
	import '../app.css';
	import '@fontsource/fira-mono/400.css';
	import '@fontsource/fira-mono/500.css';
	import '@fontsource/fira-mono/700.css';
	import { themeStore } from '../store.js';
	import { browser } from '$app/environment';
</script>

{#if browser}
	<main class="h-screen w-full dark:bg-[#222831]" class:dark={$themeStore === 'dark'}>
		<slot />
	</main>
{/if}

<style>
	:global(body) {
		font-family: 'Fira Mono', monospace;
	}
</style>
