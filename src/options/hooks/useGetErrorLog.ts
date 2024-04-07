import { useQuery } from "@tanstack/react-query";
import { getErrorLog } from "~/utils/error-log";

const useGetErrorLog = () =>
  useQuery({
    queryKey: ["errorLog"],
    queryFn: async () => getErrorLog(),
    refetchOnWindowFocus: true,
  });

export default useGetErrorLog;
