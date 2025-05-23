import { useQuery } from "@tanstack/react-query";
import { getUserAccounts } from "../actions/account-actions";

const useAccounts = () => {
  const {
    data: userAccounts,
    isPending,
    refetch: refetchUserAccounts,
  } = useQuery({
    queryKey: ["user-accounts"],
    queryFn: getUserAccounts,
  });

  return { userAccounts, isPending, refetchUserAccounts };
};

export default useAccounts;
