import { useQuery } from "@tanstack/react-query";
import { getErrorLog } from "~/service-worker/utils/error-log";

const useGetErrorLog = () =>
  useQuery({
    queryKey: ["errorLog"],
    queryFn: async () => getErrorLog(),
    refetchOnWindowFocus: true,
  });

export default useGetErrorLog;
