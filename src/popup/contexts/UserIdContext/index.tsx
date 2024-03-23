import { createContext, useContext } from "react";
import useGetMe from "~/hooks/useGetMe";
import QuickActions from "~/popup/components/QuickActions";
import PrimaryButton from "~/ui-shared/components/PrimaryButton";

type Context = {
  userId: string;
};

const UserContext = createContext<Context | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  // const analytics = useAnalytics();
  // const rollbar = useRollbar();
  const { data: userId, isError, isPending } = useGetMe();

  // useEffect(() => {
  //   if (data?.userId) {
  //     analytics.identify(data.userId);
  //     rollbar.configure({
  //       payload: {
  //         person: {
  //           id: data.userId,
  //         },
  //       },
  //     });
  //   }
  // }, [analytics, data?.userId, rollbar]);

  if (isPending) {
    return <div> Loading your user data…</div>;
  }

  if (isError || userId === undefined) {
    return (
      <div>
        <QuickActions />
        There was an error loading your data.
        <PrimaryButton>Hiii</PrimaryButton>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider.");
  }

  return context;
};
