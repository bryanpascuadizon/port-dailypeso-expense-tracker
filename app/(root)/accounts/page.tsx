"use client";

import AccountItem from "@/components/shared/Accounts/AccountItem";
import PageTitle from "@/components/shared/PageTitle";
import { getUserAccounts } from "@/lib/actions/account-actions";
import { TransactionAccount } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";

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
        <div className="account-content grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-3">
          {data.accounts.map((account: TransactionAccount, index: number) => (
            <AccountItem account={account} key={index} />
          ))}
          <div className="account-item button-hover bg-gray-300!">
            <CirclePlus className="account-icon" />
            <p>New account</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Accounts;
