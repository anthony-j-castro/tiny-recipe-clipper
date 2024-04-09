import { useQuery } from "@tanstack/react-query";
import getUserId from "~/utils/getUserId";

const useGetUserId = () =>
  useQuery({
    queryKey: ["userId"],
    queryFn: () => getUserId(),
    refetchOnWindowFocus: true,
  });

export default useGetUserId;
