import { NextRequest, NextResponse } from "next/server";
import { data } from "@/db/sample-seed-data";

/**
 * API Handler: /transaction-handlers/getTransactions()
 * Description: Get user transactions by userId
 * @param request
 * @param userId
 * @returns type Transactions[]
 */

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const userIdParams = searchParams.get("userId");
    const startDateParams = searchParams.get("startDate");
    const endDateParams = searchParams.get("endDate");

    if (userIdParams && startDateParams && endDateParams) {
      const startDate = new Date(startDateParams.replace(" ", "+"));
      const endDate = new Date(endDateParams.replace(" ", "+"));

      const transactions = data.transactions.filter(
        (transaction) =>
          new Date(transaction.transactionDate) >= startDate &&
          new Date(transaction.transactionDate) <= endDate
      );

      if (transactions) {
        return new NextResponse(JSON.stringify(transactions), { status: 200 });
      }
    }

    return new NextResponse("Cannot get transactions", { status: 500 });
  } catch (error) {
    return new NextResponse(`Cannot get transactions - ${error}`, {
      status: 500,
    });
  }
};
