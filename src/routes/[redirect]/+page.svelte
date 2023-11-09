
<script lang="ts">
import { goto } from '$app/navigation'; 
import {dataLinks} from '../../store.js'
import type {PageData} from './$types'; 

export let data : PageData



for(let i : number = 0; i < $dataLinks.length; i++){
  

   if(data.redirect === $dataLinks[i].shortName){

     $dataLinks[i].count = $dataLinks[i].count + 1
     goto(`${$dataLinks[i].url}`)
    
}
     
  } 

</script>







