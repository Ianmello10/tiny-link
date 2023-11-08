import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }: any) => {

  console.log(params.redirect)

  return {
    redirect: params.redirect
  };

}
