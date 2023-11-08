
<script lang="ts">
import {dataLinks, handleChange} from '../store.js'
import { fade } from 'svelte/transition';
import IoIosArrowDropleft from 'svelte-icons/io/IoIosArrowDropleft.svelte'
import IoMdEye from 'svelte-icons/io/IoMdEye.svelte'
import IoMdTrash from 'svelte-icons/io/IoMdTrash.svelte'

function handleClick(){

  $handleChange = !$handleChange

   console.log('component!!')
  
}



function teste(id){

 dataLinks.update(array =>{

  const index = array.findIndex(link => link.id === id)
   
  if(index !== -1){
       
    array.splice(index,1)
      
  }

   return array; 
})
}

</script>

<h2 class="mt-10 text-white text-center text-2xl">My Links</h2>
<div class="scrollable w-[90%] flex  flex-col  lg:w-[60%] overflow-auto mx-auto mt-4  h-[400px] 
  rounded-md shadow-md  m-4 border-orange-600 ">
  
  <div class="relative ">
 
    <button on:click={handleClick} class="absolute right-3 text-white top-1 w-8 h-10">

       <IoIosArrowDropleft class="w-full h-full text-white"/>

    </button>  

  <div class="w-full flex flex-col p-4 mt-4  text-white  justify-around   items-center">

     {#if $dataLinks !== 'undefined' && $dataLinks !== null }
      
    
      {#each $dataLinks as link }

 
      <div class="w-full mt-6 justify-between p-2 border-2 rounded-xl border-orange-400 h-18 flex items-center">
 
        <div class="flex flex-col p-2 h-fulll ">
            <span class="flex">
            Short link:<a class="ml-2" href="{link.shortName}">{link.shortName}</a>
            </span>
              <div class="flex gap-x-2 mt-2"><div class="w-6 h-6"><IoMdEye class="w-6 h-6" /></div> {link.count}</div>
          </div>
          

          <button class="w-6 h-6" on:click={teste(link.id)}>
            <IoMdTrash class="w-6 h-6"/>
            </button>
      

        </div>
      
     {/each}
     
 {/if}
                  
  </div>

            </div>
</div>



  <style>

 .drop { 
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
        backdrop-filter: blur(10px); /* Add a blur effect */

 }



.scrollable::-webkit-scrollbar {
 width: 10px; /* Width of the scrollbar */
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
