<script lang="ts">
	import ShowLinks from '../components/showLinks.svelte';
	import FormComponent from '../components/FormComponent.svelte';
	import ToggleTheme from '../components/toggleTheme.svelte';
  import { fade, fly } from 'svelte/transition';
  import { handleChange } from '../store.js';
 



function handleClick() {

    $handleChange = !$handleChange;
	
  }


 
</script>


  <div  class="transition-colors duration-800 ease-linear h-full w-full bg-[#EEEEEE] font-semibold text-[#393E46] dark:bg-[#222831] dark:text-white ">

   <ToggleTheme /> 
 
<div class="flex pt-14 lg:pt-10   items-center justify-center">

  <span class="text-2xl block">👽</span>
	
  <h1 class="font-gradient text-6xl font-bold block">TinyLink</h1>
	
  <span class="block text-2xl">👽</span>


  </div>
<div class=" w-full mt-2 md:w-[70%] h-auto mx-auto flex justify-center">

  {#if $handleChange}

    <FormComponent handleClick={handleClick} />

		{/if}

	{#if $handleChange === false}
		<div
			in:fly={{ x: -400, duration: 280 }}
			out:fly={{ x: -400, duration: 280 }}
			class="drop w-full h-screen fixed top-0"
		>
			<ShowLinks />
		
    </div>
	
  {/if}


</div>
</div>

<style>
	.font-gradient {
		background-color: red;	
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
