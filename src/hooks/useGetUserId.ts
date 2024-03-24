import { useQuery } from "@tanstack/react-query";
import { uuidv4 } from "decoders";
import { getUserId } from "~/storage";

const useGetUserId = () =>
  useQuery({
    queryKey: ["userId"],
    queryFn: async () => {
      const storedUserId = await getUserId();

      const userId = uuidv4.value(storedUserId);

      return userId;
    },
  });

export default useGetUserId;
