<script lang="ts">
	import { dataLinks } from '../store.js';
	import { validateLinks, generateId } from '$lib/index.js';
	import type { Link } from '$lib/types.js';
	import Toast from './Toast.svelte';

	export let handleClick: () => void;

	let urlLink: string = '';
	let shortLink: string = '';
	let count: number = 0;
	let createdAt: string = new Date().toLocaleDateString();
	let lastAcessHrs: string = '';
	let lastAcessDay: string = '';
	let toastSuccess: boolean = false;
	let toastInvalid: boolean = false;
	let displayWarn1: boolean = false;
	let displayWarn2: boolean = false;

	function updateComponent() {
		const id: string = generateId();

		let links: Link = {
			shortName: shortLink + id,
			url: urlLink,
			id: id,
			count: count,
			createdAt: createdAt,
			lastAcessHrs: lastAcessHrs,
			lastAcessDay: lastAcessDay
		};

		if (!urlLink.startsWith('https://')) {
			toastInvalid = true;
			setTimeout(() => (toastInvalid = false), 1600);
			displayWarn1 = false;
			displayWarn2 = false;
			return;
		}
		shortLink = shortLink.trim();
		urlLink = urlLink.trim();

		$dataLinks = [...$dataLinks, links];

		displayWarn1 = false;
		displayWarn2 = false;

		toastSuccess = true;
		urlLink = '';
		shortLink = '';
		setTimeout(() => (toastSuccess = false), 1500);
	}

	function shorterLink() {
		let validationResult = validateLinks(urlLink, shortLink);

		if (validationResult.urlLinkWarn && validationResult.shortLinkWarn) {
			displayWarn1 = true;
			displayWarn2 = true;
		} else if (validationResult.urlLinkWarn) {
			displayWarn2 = true;
			displayWarn1 = false;
		} else if (validationResult.shortLinkWarn) {
			displayWarn1 = true;
			displayWarn2 = false;
		} else {
			updateComponent();
		}
	}
</script>

{#if toastSuccess}
	<Toast style="bg-green-500 border-green-700 border-2" status="Shortened link" />
{/if}

{#if toastInvalid}
	<Toast style="bg-red-500 border-red-700 border-2" status="Invalid url" />
{/if}

<form
	class=" w-[90%] lg:w-[60%] mx-auto mt-0 h-[420px] p-4 top-10 relative flex flex-col justify-evenly
   m-4 rounded-2xl shadow-md border-2 border-orange-600"
>
	<button type="button" class="absolute right-2 top-4 w-8 h-10 flex" on:click={handleClick}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
			/>
		</svg>
		<span class="text-sm absolute right-1 -top-1 text-green-400">{$dataLinks.length}</span>
	</button>

	<div class="flex flex-col p-2 h-[112px] mt-10 relative">
		<label for="url">Origin link:</label>
		<input
			class="border-2 border-orange-400 p-2 bg-transparent rounded-md h-12"
			placeholder="https://example.com"
			type="text"
			bind:value={urlLink}
		/>

		{#if displayWarn2}
			<span class="text-red-500 absolute bottom-0">Please fill in this field</span>
		{/if}
	</div>

	<div class="flex flex-col mt-8 mb-4 p-2 h-[112px] relative">
		<label for="shortName">Short name:</label>
		<input
			class="border-2 border-orange-400 bg-transparent h-12 rounded-md px-2"
			placeholder="Short name..."
			type="text"
			bind:value={shortLink}
		/>

		{#if displayWarn1}
			<span class="text-red-500 absolute bottom-0">Please fill in this field</span>
		{/if}
	</div>

	<button
		class="w-[35%] h-[60px] uppercase rounded-xl border-2 border-orange-400
  mx-auto mt-4 mb-2 flex justify-around items-center font-bold"
		on:click={shorterLink}
		>Short
	</button>
</form>
