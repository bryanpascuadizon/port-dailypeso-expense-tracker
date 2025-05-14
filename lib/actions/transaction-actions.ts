import moment from "moment";
import { getTransactions } from "../handlers/transaction-handlers";
import { formatDateToISO } from "../utils";

export const getUserDailyTransactions = async (week: string | null) => {
  try {
    let startDate = "";
    let endDate = "";
    let monthIndex = 0;
    let year = 0;

    if (week) {
      monthIndex = Number(week.split("/")[0]) - 1;
      year = Number(week.split("/")[2]);
    } else {
      monthIndex = new Date().getMonth();
      year = new Date().getFullYear();
    }

    startDate = formatDateToISO(moment([year, monthIndex]).startOf("month"));
    endDate = formatDateToISO(moment([year, monthIndex]).endOf("month"));

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
