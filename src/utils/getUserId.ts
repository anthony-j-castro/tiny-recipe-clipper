import { uuidv4 } from "decoders";
import { getUserId as getStoredUserId } from "~/storage";

const getUserId = async () => {
  const storedUserId = await getStoredUserId();

  const userId = uuidv4.value(storedUserId);

  return userId;
};

export default getUserId;
