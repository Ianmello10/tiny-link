import type { PageLoad } from './$types';


interface Params {

  redirect : string;

}

export const load: PageLoad = async ({ params }: {params: Params}) => {
 
  return {
    redirect: params.redirect
  };

}
