export const transformBoardNameToPath = (boardName: string): string => {
  return `/board/${boardName.toLocaleLowerCase().split(" ").join("-")}`;
};
