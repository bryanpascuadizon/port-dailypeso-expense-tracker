import moment from "moment";
import { getTransactions } from "../handlers/transaction-handlers";
import { formatDateToISO } from "../utils";
import { FormState } from "@/types";

export const getUserDailyTransactions = async (week: Date) => {
  try {
    const monthIndex = week ? new Date(week).getMonth() : new Date().getMonth();
    const year = week ? new Date(week).getFullYear() : new Date().getFullYear();

    const startDate = formatDateToISO(
      moment([year, monthIndex]).startOf("month")
    );
    const endDate = formatDateToISO(moment([year, monthIndex]).endOf("month"));

    const response = await getTransactions("1", startDate, endDate);

    if (response) {
      return {
        success: true,
        transactions: response,
      };
    }

    return {
      success: false,
      message: response,
    };
  } catch (error) {
    return {
      success: false,
      message: `Cannot get daily transactions - ${error}`,
    };
  }
};

export const getUserMonthlyTransactions = async (year: number) => {
  try {
    const startDate = formatDateToISO(moment([year]).startOf("year"));
    const endDate = formatDateToISO(moment([year]).endOf("year"));

    const response = await getTransactions("1", startDate, endDate);

    if (response) {
      return {
        success: true,
        transactions: response,
      };
    }

    return {
      success: false,
      message: `Cannot get monthly transactions`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Cannot get monthly transactions - ${error}`,
    };
  }
};

export const submitDailyTransaction = async (
  prevState: FormState,
  formData: FormData
) => {
  try {
    const amount = formData.get("amount");
    const note = formData.get("note");
    const account = formData.get("account");
    const type = formData.get("type");
    const date = formData.get("date");

    console.log("amount: ", amount);
    console.log("note: ", note);
    console.log("account: ", account);
    console.log("type: ", type);
    console.log("date: ", date);
    return {
      success: false,
      message: `Cannot submit daily transaction`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Cannot submit daily transaction - ${error}`,
    };
  }
};
