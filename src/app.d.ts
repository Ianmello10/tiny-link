// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
    //

	}

  declare type Link = {
    shortName: string; 
    url:string;
    id: number
    count: number
  }
}

export { Link};
