import { atom } from "jotai";

const themeFromStorage = localStorage.getItem("theme");
const isPreferedThemeLight = window.matchMedia(
  "(prefers-color-scheme: light)"
).matches;

export const themeAtom = atom(
  themeFromStorage || (isPreferedThemeLight ? "light" : "dark")
);
