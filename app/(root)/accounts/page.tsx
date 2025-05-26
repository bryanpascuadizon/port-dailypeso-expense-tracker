"use client";

import PageTitle from "@/components/shared/PageTitle";
import { getUserAccounts } from "@/lib/actions/account-actions";
import { useQuery } from "@tanstack/react-query";

const Accounts = () => {
  const { data } = useQuery({
    queryKey: ["user-accounts"],
    queryFn: getUserAccounts,
  });

  return (
    data &&
    data.accounts && (
      <div>
        <PageTitle title="Accounts" />
        <div className="account-content">
          {/* {data.accounts.map((account: TransactionAccount, index: number) => (
            <AccountItem account={account} key={index} />
          ))} */}
        </div>
      </div>
    )
  );
};

export default Accounts;
