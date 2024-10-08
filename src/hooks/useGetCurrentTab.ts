import { useQuery } from "@tanstack/react-query";
import { getCurrentTab, getTab } from "~/chrome-helpers";

const useGetCurrentTab = (forcedTabId?: number) =>
  useQuery({
    queryKey: ["currentTab", forcedTabId],
    queryFn: () =>
      forcedTabId !== undefined ? getTab(forcedTabId) : getCurrentTab(),
  });

export default useGetCurrentTab;
