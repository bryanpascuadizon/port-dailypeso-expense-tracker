import moment from "moment";
import { getTransactions } from "../handlers/transaction-handlers";

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

export const getUserMonthlyTransactions = (year: number) => {
  const startDate = moment([year]).startOf("year").format();
  const endDate = moment([year]).endOf("year").format();

  console.log("start date: ", startDate);
  console.log("end date: ", endDate);
};
