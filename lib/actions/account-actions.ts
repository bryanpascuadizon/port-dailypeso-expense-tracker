import { TransactionAccount } from "@/types";
import { getAccounts } from "../handlers/account-handlers";
import { getUserSession } from "./transaction-actions";

export const getUserAccounts = async () => {
  try {
    const user = await getUserSession();

    if (user && user.id) {
      const response: TransactionAccount[] = await getAccounts(user.id);

      if (response) {
        return {
          success: true,
          accounts: response,
        };
      }
    }

    return {
      success: false,
      message: "Cannot get accounts",
    };
  } catch (error) {
    return {
      success: false,
      message: `Cannot get accounts - ${error}`,
    };
  }
};
