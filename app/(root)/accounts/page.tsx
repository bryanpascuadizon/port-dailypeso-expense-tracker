"use client";

import AccountItem from "@/components/shared/Accounts/AccountItem";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { addUserAccounts } from "@/lib/actions/account-actions";
import useAccounts from "@/lib/hooks/useAccounts";
import { TransactionAccount } from "@prisma/client";
import { CirclePlus, Loader } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const Accounts = () => {
  const { userAccounts, isPendingUserAccounts, refetchUserAccounts } =
    useAccounts();

  const [state, action, isPending] = useActionState(addUserAccounts, {
    success: false,
    message: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!state.success) return;

    const closeDialog = async () => {
      await refetchUserAccounts();
      setOpenDialog(false);
      state.success = false;
      toast(<p className="toast-text text-confirm">{state.message}</p>);
    };

    closeDialog();
  }, [state, refetchUserAccounts, setOpenDialog]);

  return (
    <div>
      <PageTitle title="Accounts" />
      <div className="account-content grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-3">
        {!isPendingUserAccounts && userAccounts && userAccounts.accounts ? (
          <>
            {userAccounts.accounts.map(
              (account: TransactionAccount, index: number) => (
                <AccountItem
                  account={account}
                  key={index}
                  refetchUserAccounts={refetchUserAccounts}
                />
              )
            )}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger className="account-item button-hover bg-gray-300!">
                <CirclePlus className="account-icon" />
                <p>New account</p>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Add account</DialogTitle>
                <DialogDescription>
                  Add a new account to categorize your daily transactions
                </DialogDescription>
                <form action={action}>
                  <Input
                    className="daily-form-item"
                    type="text"
                    id="accountName"
                    name="accountName"
                    placeholder="Account name"
                    required
                    maxLength={20}
                  />
                  <Button className="bg-green-700 hover:bg-green-600 w-full cursor-pointer">
                    {isPending ? <Loader className="animate-spin" /> : "Add"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <Skeleton className="skeleton-data w-full h-16"></Skeleton>
        )}
      </div>
    </div>
  );
};

export default Accounts;
