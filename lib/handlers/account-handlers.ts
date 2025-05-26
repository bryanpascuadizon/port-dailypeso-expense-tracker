import { TransactionAccount } from "@prisma/client";

export const getAccounts = async (userId: string) => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/accounts?userId=${userId}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  return response;
};

export const addAccount = async (userId: string, accountName: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/accounts?userId=${userId}`,
    {
      method: "POST",
      body: JSON.stringify(accountName),
    }
  ).then((res) => res.json());

  return response;
};

export const deleteAccount = async (accoundId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/accounts?accountId=${accoundId}`,
    {
      method: "DELETE",
    }
  ).then((res) => res.json());

  return response;
};

export const editAccount = async (account: TransactionAccount) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/accounts`,
    {
      method: "PATCH",
      body: JSON.stringify(account),
    }
  ).then((res) => res.json());

  return response;
};
