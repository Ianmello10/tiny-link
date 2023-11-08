

interface Link {
  urlLink: string;
  shortLink: string;
}

export function generateId(){

  return Math.floor(1000 + Math.random() * 9000).toFixed(1)
}




export function validateLinks(urlLink: string, shortLink: string){

  // Check if all links ara empty or constains empty spaces
	
  let regex = /^\s*$/.test(urlLink);
	let regex2 = /^\s*$/.test(shortLink);

 
  return  urlLink !== '' && shortLink !== '' && !regex && !regex2 

 

  }





