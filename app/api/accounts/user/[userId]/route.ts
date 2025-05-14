import { NextRequest, NextResponse } from "next/server";
import { data } from "@/db/sample-seed-data";

/**
 * API Handler: /account-handlers/getAccounts()
 * Description: Get user accounts by userId
 * @param request
 * @param userId
 * @returns Accounts[]
 */

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    const { userId } = await params;
    const accounts = data.accounts;

    console.log(userId);

    if (accounts) {
      return new NextResponse(JSON.stringify(accounts), { status: 200 });
    }

    return new NextResponse("Cannot get accounts.", { status: 500 });
  } catch (error) {
    return new NextResponse(`Cannot get accounts - ${error}`, { status: 200 });
  }
};
