export const getAccounts = async (userId: string) => {
  const response = fetch(`/api/accounts/user/${userId}`, {
    method: "GET",
  }).then((res) => res.json());

  return response;
};
