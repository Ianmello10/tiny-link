
<script lang="ts">
import {dataLinks, handleChange, themeStore} from '../store.js'
import { fade,fly } from 'svelte/transition';
import type {Link} from '$lib/types.js'

 

function handleClick(){

  $handleChange = !$handleChange 
}


function deleteLink(id: string): void{

 dataLinks.update(array =>{

 const index = array.findIndex((link : Link)  => link.id === id)
   
 if(index !== -1){
       
    array.splice(index,1)
      
  }

   return array; 
})
}

</script>

<h2 class="mt-6 text-white text-center text-2xl font-bold ">My Links</h2>
<div 	in:fly={{ x: -400, duration: 900 }}
			out:fly={{ x: -400, duration: 380 }} class:scrollable={$themeStore === 'dark'} class=" w-[90%] flex  flex-col py-4  lg:w-[60%] overflow-auto mx-auto mt-4  h-[400px] 
  rounded-md shadow-md  m-4 border-orange-600  bg-white/60 text-[#393E46] dark:bg-[#222831] dark:text-white">
  
  <div class="relative ">
 
    <button on:click={handleClick} class="absolute right-3 top-1 w-8 h-8">

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
 

    </button>  

  <div class="w-full flex flex-col p-6 mt-4    justify-around   items-center">

     {#if $dataLinks !== 'undefined' && $dataLinks !== null }
      
    
      {#each $dataLinks as link }

 
      <div  transition:fade class="w-full mt-6 justify-between p-2 border-2 rounded-xl border-orange-400 h-18 flex items-center">
 
        <div class="flex flex-col p-2 h-fulll ">
            <span class="flex">
            Short link:<a class="ml-2" href="{link.shortName}">{link.shortName}</a>
            </span>
         
      <div class="flex gap-x-2 mt-2">
        
      <div class="w-6 h-6">

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

   </div> {link.count}</div>
   
            </div>
          

  <button class="w-6 h-6" on:click={deleteLink(link.id)}>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
  </button>
      
</div>
            
    {:else}

      <h3 class="text-lg text-center">Nothing here</h3>
      
     {/each}
    
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
