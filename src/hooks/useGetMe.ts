import { useQuery } from "@tanstack/react-query";
import { uuidv4 } from "decoders";
import { getLocalStorage } from "~/chrome-helpers";
import { USER_ID_STORAGE_KEY } from "~/storage";

const useGetMe = () =>
  useQuery({
    queryKey: ["userId"],
    queryFn: async () => {
      const storedUserId = await getLocalStorage(USER_ID_STORAGE_KEY);

      const userId = uuidv4.value(storedUserId);

      return userId;
    },
  });

export default useGetMe;
