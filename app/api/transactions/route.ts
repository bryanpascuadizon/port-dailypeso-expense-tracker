import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";
import { Transaction } from "@prisma/client";
import { formatDateToISO } from "@/lib/utils";

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

      const transactions = await prisma.transaction.findMany({
        where: {
          userId: userIdParams,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          transactionAccount: true,
        },
      });

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

export const POST = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const userIdParams = searchParams.get("userId");
    const newTransaction = await request.json();

    if (userIdParams && newTransaction) {
      const transaction: Transaction = await prisma.transaction.create({
        data: {
          userId: userIdParams,
          date: newTransaction.date,
          note: newTransaction.note,
          transactionAccountId: newTransaction.account,
          amount: newTransaction.amount,
          type: newTransaction.type,
        },
      });

      if (transaction) {
        return new NextResponse(JSON.stringify(transaction), {
          status: 200,
        });
      }
    }

    return new NextResponse(`Cannot add transaction`, {
      status: 500,
    });
  } catch (error) {
    console.log("ERRRROOOOR", error);
    return new NextResponse(`Cannot add transaction - ${error}`, {
      status: 500,
    });
  }
};
