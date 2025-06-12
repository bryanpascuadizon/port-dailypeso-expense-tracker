import { FormState, TransactionAccount } from "@/types";
import {
  addAccount,
  deleteAccount,
  editAccount,
  getAccounts,
} from "../handlers/account-handlers";
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

export const addUserAccounts = async (
  formState: FormState,
  formData: FormData
) => {
  try {
    const user = await getUserSession();

    const accountName = formData.get("accountName") as string;

    if (!accountName) {
      return {
        success: false,
        message: `Cannot add account`,
      };
    }

    if (user && user.id) {
      const response: TransactionAccount = await addAccount(
        user.id,
        accountName
      );

      if (response) {
        return {
          success: true,
          message: "Account added successfully",
        };
      }
    }

    return {
      success: false,
      message: `Cannot add account`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Cannot add account - ${error}`,
    };
  }
};

export const deleteUserAccount = async (accountId: string) => {
  try {
    const response = await deleteAccount(accountId);

    if (!response) {
      return {
        success: false,
        message: `Cannot delete account`,
      };
    }

    return {
      success: true,
      message: "Account deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `Cannot delete account - ${error}`,
    };
  }
};

export const editUserAccount = async (
  prevState: FormState,
  formData: FormData
) => {
  try {
    const accountId = formData.get("accoundId") as string;
    const userId = formData.get("userId") as string;
    const accountName = formData.get("accountName") as string;

    if (!accountId || !userId || !accountName) {
      return {
        success: false,
        message: `Cannot update account`,
      };
    }

    const editedAccount: TransactionAccount = {
      id: accountId,
      userId: userId,
      name: accountName,
    };

    const response = await editAccount(editedAccount);

    if (!response) {
      return {
        success: false,
        message: `Cannot update account`,
      };
    }

    return {
      success: true,
      message: "Account updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `Cannot update account - ${error}`,
    };
  }
};
