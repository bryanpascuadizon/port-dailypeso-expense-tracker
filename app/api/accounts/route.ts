import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

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

    if (userIdParams) {
      const accounts = await prisma.transactionAccount.findMany({
        where: {
          userId: userIdParams,
        },
      });

      if (accounts) {
        return new NextResponse(JSON.stringify(accounts), { status: 200 });
      }
    }

    return new NextResponse("Cannot get accounts", { status: 500 });
  } catch (error) {
    return new NextResponse(`Cannot get accounts - ${error}`, {
      status: 200,
    });
  }
};
