import { DemoBrowserSettings } from "./types.ts";
import { useLocalStorage, useToggle } from "usehooks-ts";
import { useEffect } from "react";

export function useDemoBrowserSettings() {
  const [settings, setSettings] = useLocalStorage<DemoBrowserSettings>(
    "demoBrowser",
    {
      displayMode: "grid",
      gameMode: "all",
      query: "",
      page: 1,
    },
  );

  function setPage(page: number) {
    setSettings({ ...settings, page });
  }

  function nextPage() {
    setPage(settings.page + 1);
  }

  function prevPage() {
    setPage(settings.page - 1);
  }

  return { settings, setSettings, setPage, nextPage, prevPage };
}

export function useDemoScoreSpoiler() {
  const [globalShow] = useLocalStorage<boolean>("demoBrowserShowScores", false);
  const [isVisible, toggleVisible, setIsVisible] = useToggle(globalShow);

  useEffect(() => {
    setIsVisible(globalShow);
  }, [globalShow, setIsVisible]);

  return { isVisible, toggleVisible, show: () => setIsVisible(true) };
}
