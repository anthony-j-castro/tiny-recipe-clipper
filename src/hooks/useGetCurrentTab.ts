import { useQuery } from "@tanstack/react-query";
import { getCurrentTab } from "~/chrome-helpers";

const useGetCurrentTab = () =>
  useQuery({
    queryKey: ["currentTab"],
    queryFn: () => getCurrentTab(),
  });

export default useGetCurrentTab;
