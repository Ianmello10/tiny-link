
<script lang="ts">
import { dataLinks } from '../store.js';
import IoIosArrowDropright from 'svelte-icons/io/IoIosArrowDropright.svelte';
import { validateLinks } from '$lib';
import Toast from './Toast.svelte';

interface Link{ 
  url : string,
  shortName : string,
  id : string,
  count : number
}

export let handleClick : () => void

	let urlLink : string = ''
	let shortLink : string = ''
	let count : number = 0
	let toast : boolean = false 
	let warn : boolean = false
	let warn2 : boolean = false


function updateComponent() {

	const id  : string = Math.floor(1000 + Math.random() * 9000).toFixed(1);

	let links : Link = {
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
    
  } else {
     warn = true 
    
     }
}

 
</script>

  
{#if toast}
	<Toast style="bg-green-500" status="Link encurtado" />
{/if}

{#if warn2}
	<Toast style="bg-red-500" status="Url invalida" />
{/if}


  <form class=" w-[90%] lg:w-[60%] mx-auto mt-0 h-auto p-4 top-10 relative text-white flex flex-col justify-evenly
   m-4 rounded-2xl shadow-md border-2 border-orange-600">

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

