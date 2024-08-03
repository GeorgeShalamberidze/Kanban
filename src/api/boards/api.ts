import api from "..";
import { BOARD_URL } from "./enum";
import { BoardData, BoardDataResponse } from "./index.types";

export const getBoardData = async (
  query: string = "",
  config?: object
): Promise<BoardData[]> => {
  const res = await api.get<BoardDataResponse>(
    `${BOARD_URL.GET}?${query}`,
    config
  );
  return res.data.boards;
};
