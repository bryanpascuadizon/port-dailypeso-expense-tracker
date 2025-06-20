"use server";

import moment from "moment";
import {
  addDailyTransaction,
  deleteDailyTransaction,
  editDailyTransaction,
  getTransactions,
} from "../handlers/transaction-handlers";
import { formatDateToISO } from "../utils";
import { FormState, Transactions } from "@/types";
import { auth } from "@/auth";

export const getUserSession = async () => {
  const session = await auth();
  const user = session?.user;

  return user;
};

export const getUserDailyTransactions = async (week: Date) => {
  try {
    const user = await getUserSession();

    if (user && user.id) {
      const monthIndex = week
        ? new Date(week).getMonth()
        : new Date().getMonth();
      const year = week
        ? new Date(week).getFullYear()
        : new Date().getFullYear();

      const startDate = formatDateToISO(
        moment([year, monthIndex]).startOf("month").format("MMM DD, YYYY")
      );
      const endDate = formatDateToISO(
        moment([year, monthIndex]).endOf("month").format("MMM DD, YYYY")
      );

      const response = await getTransactions(
        user.id,
        startDate.toString(),
        endDate.toString()
      );

      if (response) {
        return {
          success: true,
          transactions: response,
        };
      }
    }

    return {
      success: false,
      message: "Cannot get daily transactions",
    };
  } catch {
    return {
      success: false,
      message: `Cannot get daily transactions`,
    };
  }
};

export const getUserMonthlyTransactions = async (year: number) => {
  try {
    const user = await getUserSession();

    if (user && user.id) {
      const startDate = formatDateToISO(
        moment([year]).startOf("year").format("MMM DD, YYYY")
      );
      const endDate = formatDateToISO(
        moment([year]).endOf("year").format("MMM DD, YYYY")
      );

      const response = await getTransactions(user.id, startDate, endDate);

      if (response) {
        return {
          success: true,
          transactions: response,
        };
      }
    }

    return {
      success: false,
      message: `Cannot get monthly transactions`,
    };
  } catch {
    return {
      success: false,
      message: `Cannot get monthly transactions`,
    };
  }
};

export const getUserMonthyTransactionsForSummaryExport = async (
  startDate: Date,
  endDate: Date
) => {
  try {
    const user = await getUserSession();

    if (user && user.id) {
      const exportStartDate = moment(startDate)
        .startOf("month")
        .format("MMM DD, YYYY");
      const exportEndDate = moment(endDate)
        .endOf("month")
        .format("MMM DD, YYYY");

      const response = await getTransactions(
        user.id,
        exportStartDate,
        exportEndDate
      );

      if (!response.length) {
        return {
          success: false,
          message: "No transactions to export",
        };
      }

      return {
        success: true,
        transactions: response,
      };
    }

    return {
      success: false,
      message: `Cannot get transactions for summary report`,
    };
  } catch {
    return {
      success: false,
      message: `Cannot get transactions for summary export`,
    };
  }
};

export const submitDailyTransaction = async (
  prevState: FormState,
  formData: FormData
) => {
  try {
    const user = await getUserSession();

    if (user && user.id) {
      const amount: number = Number(formData.get("amount"));
      const note: string = formData.get("note") as string;
      const account: string = formData.get("account") as string;
      const type: string = formData.get("type") as string;
      const date: string = formData.get("date") as string;
      const details: string = formData.get("details") as string;

      const newTransaction = {
        amount,
        note,
        account,
        type,
        details,
        date: new Date(formatDateToISO(`${date}`)),
      };

      const response = await addDailyTransaction(newTransaction, user.id);

      if (response) {
        return {
          success: true,
          message: `Transaction created successfully`,
        };
      }
    }

    return {
      success: false,
      message: `Cannot submit daily transaction`,
    };
  } catch {
    return {
      success: false,
      message: `Cannot submit daily transaction`,
    };
  }
};

export const editTransaction = async (
  prevState: FormState,
  formData: FormData
) => {
  try {
    const id: string = formData.get("id") as string;
    const userId: string = formData.get("userId") as string;
    const date: string = formData.get("date") as string;
    const amount: number = Number(formData.get("amount"));
    const note: string = formData.get("note") as string;
    const type: string = formData.get("type") as string;
    const account: string = formData.get("account") as string;
    const details: string = formData.get("details") as string;

    const updatedTransaction: Transactions = {
      id,
      userId,
      date: new Date(formatDateToISO(`${date}`)),
      amount,
      note,
      type,
      details,
      transactionAccountId: account,
    };

    const user = await getUserSession();

    if (!user || !updatedTransaction) {
      return {
        success: false,
        message: `Cannot update daily transaction`,
      };
    }

    const response = await editDailyTransaction(updatedTransaction);

    if (!response) {
      return {
        success: false,
        message: `Cannot update daily transaction`,
      };
    }

    return {
      success: true,
      message: `Transaction updated successfully`,
    };
  } catch {
    return {
      success: false,
      message: `Cannot update daily transaction`,
    };
  }
};

export const deleteTransaction = async (transactionId: string) => {
  try {
    const response = await deleteDailyTransaction(transactionId);

    if (!response) {
      return {
        success: false,
        message: "Cannot delete transaction",
      };
    }

    return {
      success: true,
      message: "Transaction deleted successfully",
    };
  } catch {
    return {
      success: false,
      message: `Cannot submit daily transaction`,
    };
  }
};
