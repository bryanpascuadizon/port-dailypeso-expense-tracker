import moment from "moment";
import { getTransactions } from "../handlers/transaction-handlers";
import { formatDateToISO } from "../utils";

export const getUserDailyTransactions = async (week: string | null) => {
  try {
    const monthIndex = week ? new Date(week).getMonth() : new Date().getMonth();
    const year = week ? new Date(week).getFullYear() : new Date().getFullYear();

    const startDate = formatDateToISO(
      moment([year, monthIndex]).startOf("month")
    );
    const endDate = formatDateToISO(moment([year, monthIndex]).endOf("month"));

    const response = await getTransactions("1", startDate, endDate);

    console.log(response);
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
