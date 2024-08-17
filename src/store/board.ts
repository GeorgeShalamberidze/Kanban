import { BoardData } from "@/api/boards/index.types";
import { atom } from "jotai";

export const activeBoardAtom = atom<BoardData | undefined>();

export const allBoardsAtom = atom<BoardData[] | undefined>([]);
