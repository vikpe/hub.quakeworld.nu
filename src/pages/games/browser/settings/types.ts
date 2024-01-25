export type DisplayMode = "Grid" | "List";
export type GameMode = "All" | "1on1" | "2on2" | "4on4" | "Wipeout" | "CTF";

export type DemoBrowserSettings = {
  displayMode: DisplayMode;
  gameMode: GameMode;
  query: string;
  page: number;
};
