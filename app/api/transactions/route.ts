import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";
import { Transaction } from "@prisma/client";
import { Transactions } from "@/types";

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

    if (!userIdParams || !startDateParams || !endDateParams) {
      return new NextResponse("Cannot get transactions", { status: 400 });
    }

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

    return new NextResponse(JSON.stringify(transactions), { status: 200 });
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

    if (!userIdParams || !newTransaction) {
      return new NextResponse(`Cannot add transaction`, {
        status: 500,
      });
    }

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

    return new NextResponse(JSON.stringify(transaction), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(`Cannot add transaction - ${error}`, {
      status: 500,
    });
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    const updatedTransaction = await request.json();
    const transactionForEdit: Transactions = updatedTransaction;

    if (!updatedTransaction) {
      return new NextResponse(`Cannot edit transaction`, { status: 500 });
    }

    const transaction = await prisma.transaction.update({
      where: {
        id: transactionForEdit.id,
      },
      data: {
        note: transactionForEdit.note,
        amount: transactionForEdit.amount,
        date: transactionForEdit.date,
        transactionAccountId: transactionForEdit.transactionAccountId,
        type: transactionForEdit.type,
      },
    });

    return new NextResponse(JSON.stringify(transaction), { status: 200 });
  } catch (error) {
    return new NextResponse(`Cannot edit transaction - ${error}`, {
      status: 500,
    });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const transactionId = searchParams.get("transactionId");

    console.log(transactionId);

    if (!transactionId) {
      return new NextResponse("Cannot delete transaction", { status: 500 });
    }

    const transaction = await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });

    return new NextResponse(JSON.stringify(transaction), { status: 200 });
  } catch (error) {
    return new NextResponse(`Cannot delete transaction - ${error}`, {
      status: 500,
    });
  }
};
