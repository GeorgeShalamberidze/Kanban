import { atom } from "jotai";

const isPreferedThemeLight = window.matchMedia(
  "(prefers-color-scheme: light)"
).matches;

export const themeAtom = atom(isPreferedThemeLight ? true : false);
