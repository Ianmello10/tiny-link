
<script lang="ts">

  import {fly} from 'svelte/transition';

  
export let status : string
export let style : string

</script>



  <div in:fly={{y:40, duration:1200}} out:fly={{y:-10, duration:800}}  class="absolute flex items-center justify-center rounded-lg  top-6 right-4 w-[225px] h-[80px] {style}">
 
  <h3 class="text-gray-700 font-bold">{status}</h3>

</div>
