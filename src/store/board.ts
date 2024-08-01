import { atom } from "jotai";

export const activeBoardAtom = atom<{ id: number; board: string } | undefined>({
  id: 0,
  board: "Platform Launch",
});
