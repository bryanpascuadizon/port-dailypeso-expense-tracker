import { Accounts } from "@/types";
import { getAccounts } from "../handlers/account-handlers";

export const getUserAccounts = async () => {
  try {
    const response: Accounts[] = await getAccounts("1");

    if (response) {
      return {
        success: true,
        accounts: response,
      };
    }

    return {
      success: false,
      message: response,
    };
  } catch (error) {
    return {
      success: false,
      message: `Cannot get accounts - ${error}`,
    };
  }
};
