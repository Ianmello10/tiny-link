import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  if (response.headers) {
    response.headers["Cache-Control"] = "no-store";
  }

  return response;
};
