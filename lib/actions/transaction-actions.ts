import moment from "moment";
import { getTransactions } from "../handlers/transaction-handlers";
import { formatDateToISO } from "../utils";

export const getUserDailyTransactions = async () => {
  try {
    const startDate = moment().startOf("day").format();
    const endDate = moment().endOf("day").format();

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
