
<script lang="ts">
import '../app.css'
import '@fontsource/fira-mono/400.css';
import '@fontsource/fira-mono/500.css';
import '@fontsource/fira-mono/700.css';
import {themeStore} from '../store.js'



</script>

<main class="h-screen w-full"  class:dark={$themeStore === 'dark'}  > 

  <slot/>
</main>

<style> 

  :global(body){

   font-family: 'Fira Mono', monospace;

  }

</style>
