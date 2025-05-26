import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";
import { TransactionAccount } from "@prisma/client";

/**
 * API Handler: /account-handlers/getAccounts()
 * Description: Get user accounts by userId
 * @param request
 * @param userId
 * @returns Accounts[]
 */

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const userIdParams = searchParams.get("userId");

    if (!userIdParams) {
      return new NextResponse("Cannot get user accounts", { status: 500 });
    }

    const accounts = await prisma.transactionAccount.findMany({
      where: {
        userId: userIdParams,
      },
    });

    return new NextResponse(JSON.stringify(accounts), { status: 200 });
  } catch (error) {
    return new NextResponse(`Cannot get accounts - ${error}`, {
      status: 200,
    });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");
    const accountName = await request.json();

    if (!userId || !accountName) {
      return new NextResponse("Cannot add user account", { status: 500 });
    }

    const account = await prisma.transactionAccount.create({
      data: {
        userId: userId,
        name: accountName,
      },
    });

    return new NextResponse(JSON.stringify(account), { status: 200 });
  } catch (error) {
    return new NextResponse(`Cannot add user account - ${error}`, {
      status: 500,
    });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");

    if (!accountId) {
      return new NextResponse("Cannot delete user account", { status: 500 });
    }

    const account = await prisma.transactionAccount.delete({
      where: {
        id: accountId,
      },
    });

    if (!account) {
      return new NextResponse("Cannot delete user account", { status: 500 });
    }

    return new NextResponse(JSON.stringify(account), { status: 200 });
  } catch (error) {
    return new NextResponse(`Cannot delete user account - ${error}`, {
      status: 500,
    });
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    const editedAccount: TransactionAccount = await request.json();

    if (!editedAccount) {
      return new NextResponse("Cannot edit user account", { status: 500 });
    }

    const account = await prisma.transactionAccount.update({
      where: {
        id: editedAccount.id,
      },
      data: {
        name: editedAccount.name,
      },
    });

    return new NextResponse(JSON.stringify(account), { status: 200 });
  } catch (error) {
    return new NextResponse(`Cannot edit user account - ${error}`, {
      status: 500,
    });
  }
};
