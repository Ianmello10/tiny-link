import { writable } from "svelte/store";
import { browser } from "$app/environment";


const storedLinks =  JSON.parse(browser && localStorage.getItem('links')) || []

export const dataLinks = writable(browser && storedLinks);

 dataLinks.subscribe((value)=>{
 
  if(browser){
   
     localStorage.links = JSON.stringify(value)
  
   } 
})


export const handleChange = writable(true)



