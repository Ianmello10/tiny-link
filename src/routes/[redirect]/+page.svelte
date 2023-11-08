
<script lang="ts">
	import { goto } from '$app/navigation';
  import {redirect} from '@sveltejs/kit'
  import {dataLinks} from '../../store.js'
  
export let data 

  //$dataLinks 

  for(let i : number = 0; i < $dataLinks.length; i++){
  

     if(data.redirect === $dataLinks[i].shortName){

    //console.log($dataLinks[i].shortName,'teste')
  
     $dataLinks[i].count = $dataLinks[i].count + 1
     goto(`${$dataLinks[i].url}`)
    

    }
     
  } 

</script>







