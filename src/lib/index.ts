

interface Link {
  urlLink: string;
  shortLink: string;
}

export function generateId(){

  return Math.floor(1000 + Math.random() * 9000).toFixed(1)
}




export function validateLinks(urlLink, shortLink,warn2,warn){

  // Check if all links ara empty or constains empty spaces
	
  let regex = /^\s*$/.test(urlLink);
	let regex2 = /^\s*$/.test(shortLink);

 
  if( urlLink !== '' && shortLink !== '' && !regex && !regex2) {

  warn = false ;

 console.log('testee') 
 
   if(!urlLink.startsWith('https://')){
   
    warn2 = true
    setTimeout(() => warn2 = false, 1600)
    return 
  }

  }else { 

    warn = true

    console.log('olaa')
  
     return;
  }
}



