"use client";

import PageTitle from "@/components/shared/PageTitle";
import { getUserAccounts } from "@/lib/actions/account-actions";
import { Accounts as AccountType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";

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
        <div className="grid grid-cols-3 gap-2">
          <div className="account-card bg-gray-200">
            <PlusIcon width={20} height={20} className="w-full" />
          </div>
          {data.accounts.map((account: AccountType, index: number) => (
            <div className="account-card bg-white" key={index}>
              {account.name}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Accounts;
