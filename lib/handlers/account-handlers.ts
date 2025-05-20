export const getAccounts = async (userId: string) => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/accounts?userId=${userId}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  return response;
};
