<script lang="ts">
	import Toast from './Toast.svelte';
	import { dataLinks, handleChange, themeStore } from '../store.js';
	import { fade, fly } from 'svelte/transition';
	import { getLinksData, deleteLinkById, subscribeToLinksChanges } from '$lib/firebaseService';
	import { onDestroy, onMount } from 'svelte';
	import { URL_BASE } from '../lib/index';
	import type { Link } from '$lib/types';

	let url = URL_BASE;

	let toastClip: boolean = false;
	let linksDb: Link[] = [];
	let linksUnsubscribe: () => void;
	let loading: boolean;

	onMount(async () => {
		if ($dataLinks && $dataLinks.length > 0) {
			loading = true;
			linksDb = await getLinksData($dataLinks);
			loading = false;
			linksUnsubscribe = subscribeToLinksChanges((id: string) => {
				linksDb = linksDb.filter((link) => link.id !== id);
			});
		}
	});

	onDestroy(() => {
		if (linksUnsubscribe) {
			linksUnsubscribe();
		}
	});

	function clipBoard(value: string) {
		navigator.clipboard
			.writeText(url + value)
			.then(() => {
				toastClip = true;
				setTimeout(() => (toastClip = false), 1600);
			})
			.catch((err) => {
				console.error('Could not copy to clipboard', err);
			});
	}

	function handleClick() {
		$handleChange = !$handleChange;
	}
</script>

{#if toastClip}
	<Toast style="bg-green-400 border-2 border-green-700" status="Link copied to clipboard" />
{/if}

<h2 class="mt-6 text-white text-center text-2xl font-bold">My Links</h2>

<div
	in:fly={{ x: -400, duration: 900 }}
	out:fly={{ x: -400, duration: 380 }}
	class:scrollable={$themeStore === 'dark'}
	class=" w-[95%] flex flex-col py-4 lg:w-[60%] overflow-auto mx-auto mt-4 h-[400px]
  rounded-md shadow-md m-4 border-orange-600 bg-white/60 text-[#393E46] dark:bg-[#222831] dark:text-white"
>
	<div class="relative">
		<button on:click={handleClick} class="absolute right-3 top-1 w-8 h-8">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-8 h-8"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</button>

		<div class="w-full flex flex-col p-4 md:p-6 mt-4 justify-around items-center">
			{#if loading}
				<!-- Estate of loading -->
				<div class="text-center mt-20">
					<div role="status">
						<svg
							aria-hidden="true"
							class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			{/if}

			{#if typeof $dataLinks !== 'undefined' && linksDb.length > 0 && $dataLinks.length > 0}
				{#each linksDb as link}
					<div
						transition:fade
						class="w-full mt-6 justify-between p-2 border-2 rounded-xl border-orange-400 h-18 flex items-center"
					>
						<div class="w-[90%] flex flex-col p-2 h-fulll overflow-auto">
							<span class="flex w-full overflow-auto">
								<span class="hidden md:block">Short link:</span><a
									class="md:ml-2"
									href={link.shortName}>{link.shortName}</a
								>
							</span>

							<span class="flex gap-x-4 w-full overflow-auto mt-2">
								<a
									href={link.shortName}
									class="px-2 border-2 border-[#393E46] dark:border-[#EEEEEE] py-[2px] rounded-md"
								>
									{url}{link.shortName}
								</a>

								<button on:click={() => clipBoard(link.shortName)}>
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
											d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
										/>
									</svg>
								</button>
							</span>
							<div class="flex w-full mt-2 text-sm md:text-md">Created at: {link.createdAt}</div>
							{#if link.lastAcessDay}
								<div class="hidden md:flex w-full mt-1 text-sm md:text-md">
									Last acess: <span class=" ml-2 text-green-500 dark:text-green-400">
										{link.lastAcessDay.toDate().getDate()}/<span
											>{link.lastAcessDay.toDate().getMonth()}/</span
										><span>{link.lastAcessDay.toDate().getFullYear()}{' '}at</span>
										<span
											>{link.lastAcessDay.toDate().getHours()}:{link.lastAcessDay
												.toDate()
												.getMinutes()}:{link.lastAcessDay.toDate().getSeconds()}</span
										>
										<span class="text-[#393E46] dark:text-white" /></span
									>
								</div>
							{/if}

							<div class="flex gap-x-2 mt-2">
								<div class="w-6 h-6">
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
											d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								</div>
								{link.count}
							</div>
						</div>

						<button class="w-auto h-auto" on:click={() => deleteLinkById(link.id, dataLinks)}>
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
									d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
								/>
							</svg>
						</button>
					</div>
				{/each}
			{/if}

			{#if typeof $dataLinks === 'undefined' || $dataLinks.length === 0}
				<h3 class="text-center mt-10 text-2xl">Nothing here!</h3>
			{/if}
		</div>
	</div>
</div>

<style>
	.scrollable::-webkit-scrollbar {
		width: 12.5px; /* Width of the scrollbar */
	}

	.scrollable::-webkit-scrollbar-track {
		background: #333; /* Color of the track */
	}

	.scrollable::-webkit-scrollbar-thumb {
		background: #666; /* Color of the scroll thumb */
	}

	.scrollable::-webkit-scrollbar-thumb:hover {
		background: #999; /* Color of the scroll thumb on hover */
	}

	@media (prefers-color-scheme: dark) {
		.scrollable::-webkit-scrollbar-track {
			background: #333; /* Color of the track in dark mode */
		}

		.scrollable::-webkit-scrollbar-thumb {
			background: #666; /* Color of the scroll thumb in dark mode */
		}

		.scrollable::-webkit-scrollbar-thumb:hover {
			background: #999; /* Color of the scroll thumb on hover in dark mode */
		}
	}

	@media (prefers-color-scheme: light) {
		.scrollable::-webkit-scrollbar-track {
			background: #f1f1f1; /* Color of the track in light mode */
		}

		.scrollable::-webkit-scrollbar-thumb {
			background: #888; /* Color of the scroll thumb in light mode */
		}

		.scrollable::-webkit-scrollbar-thumb:hover {
			background: #555; /* Color of the scroll thumb on hover in light mode */
		}
	}
</style>
