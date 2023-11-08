<script lang="ts">
	import ShowLinks from '../components/showLinks.svelte';
	import Toast from '../components/Toast.svelte';
	import { fade, fly } from 'svelte/transition';
	import { dataLinks, handleChange } from '../store.js';
	import IoIosArrowDropright from 'svelte-icons/io/IoIosArrowDropright.svelte';
	import { validateLinks } from '$lib';

	let urlLink = '';
	let shortLink = '';
	let count = 0;
	let toast = false;
	let warn = false;
	let warn2 = false;


	function updateComponent() {

		const id = Math.floor(1000 + Math.random() * 9000).toFixed(1);

		let links = {
			shortName: shortLink + id,
			url: urlLink,
			id: id,
			count: count
		};


  if(!urlLink.startsWith("https://")){

     warn2 = true  
     setTimeout(() => warn2 = false, 1400);
     return 
}
 
		shortLink = shortLink.trim();
		urlLink = urlLink.trim();

    $dataLinks = [...$dataLinks, links];
		toast = true;
		urlLink = '';
		shortLink = '';

		setTimeout(() => (toast = false), 1400);
} 	

function shorterLink(){ 

  if(validateLinks(urlLink,shortLink)){
       warn = false 
       updateComponent()
    }
      else {
             warn = true 
    }
}

	function handleClick() {
		$handleChange = !$handleChange;
	}


</script>

<div class="flex h-20 mt-4 items-center justify-center">
	<span class="text-2xl block">👽</span>
	<h1 class=" teste text-6xl font-bold block">TinyLink</h1>
	<span class="block text-2xl">👽</span>
</div>

{#if toast}
	<Toast style="bg-green-500" status="Link encurtado" />
{/if}

{#if warn2}
	<Toast style="bg-red-500" status="Url invalida" />
{/if}

<div class=" w-full mt-2 md:w-[70%] h-auto mx-auto flex justify-center">
	{#if $handleChange}
		<form
        class=" w-[90%] lg:w-[60%] mx-auto mt-0 h-auto p-4 top-10 relative text-white flex flex-col justify-evenly
   m-4 rounded-2xl shadow-md border-2 border-orange-600"
		>
			<button class="absolute right-2 top-2 w-8 h-10" on:click={handleClick}>
				<IoIosArrowDropright class="w-full h-full text-white" />
			</button>

			<div class="flex flex-col p-2 h-[112px] mt-10 relative">
				<label for="url">Origin link:</label>
				<input
					class="border-2 border-orange-400 p-2 bg-transparent rounded-md h-12"
					placeholder="https://example.com"
					type="text"
					bind:value={urlLink}
				/>

				{#if warn}
					<span class="text-red-500 absolute bottom-0">Please, fill all fields</span>
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

				{#if warn}
					<span class="text-red-500 absolute bottom-0">Please, fill all fields</span>
				{/if}
			</div>

			<button
				class="w-[35%] h-[60px] uppercase rounded-xl border-2 border-orange-400
  mx-auto mt-4 mb-2 flex justify-around items-center font-bold"
				on:click={shorterLink}
				>Short
			</button>
		</form>
	{/if}

	{#if $handleChange === false}
		<div
			in:fly={{ x: -400, duration: 900 }}
			out:fly={{ x: -400, duration: 380 }}
			class="drop w-full h-screen fixed top-0"
		>
			<ShowLinks />
		</div>
	{/if}
</div>

<style>
	.teste {
		background-color: red;

		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS';
		background-clip: text;

		background-size: 100%;
		background-repeat: repeat;

		@supports (background-clip: text) {
			background-image: linear-gradient(
				210deg,
				rgba(255, 233, 168, 0.6026785714285714) 12%,
				rgba(238, 147, 34, 1) 55%,
				rgba(218, 70, 48, 0.7651435574229692) 100%
			);
			background-clip: text;
			color: transparent;
		}
	}

	.drop {
		background-color: rgba(34, 40, 49, 0.5); /* Semi-transparent black background */
		backdrop-filter: blur(10px); /* Add a blur effect */
	}
</style>
