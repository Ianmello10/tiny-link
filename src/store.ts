import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Link } from "$lib/types";

const storedLinks =
  JSON.parse(browser && localStorage.getItem("links") as any) || [];

export const dataLinks = writable<Link[]>(browser && storedLinks);

dataLinks.subscribe((value) => {
  if (browser) {
    localStorage.links = JSON.stringify(value);
  }
});

export const handleChange = writable<boolean>(true);

const theme = JSON.parse(browser && localStorage.getItem("theme") as any) ||
  "light";

export const themeStore = writable<string>(theme);

themeStore.subscribe((value) => {
  if (browser) {
    localStorage.theme = JSON.stringify(value);
  }
});
