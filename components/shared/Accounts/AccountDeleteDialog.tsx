"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteUserAccount } from "@/lib/actions/account-actions";
import { TransactionAccount } from "@/types";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const AccountDeleteDialog = ({
  account,
  isEditPending,
  refetchUserAccounts,
}: {
  account: TransactionAccount;
  isEditPending: boolean;
  refetchUserAccounts: () => void;
}) => {
  const [isDeletePending, startDeleteTransition] = useTransition();

  const handleDeleteAccount = () => {
    startDeleteTransition(async () => {
      const response = await deleteUserAccount(account.id);

      if (response.success) {
        await refetchUserAccounts();
        toast(<p className="toast-text text-delete">{response.message}</p>);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-red-700 hover:bg-red-600 cursor-pointer"
          disabled={isDeletePending || isEditPending}
        >
          {isDeletePending || isEditPending ? (
            <Loader className="animate-spin" />
          ) : (
            "Delete"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogDescription>
          <span className="font-bold">
            Are you sure you want to delete this account?{" "}
          </span>{" "}
          This will uncategorize your transactions related to this account and
          will not be included in the summary report.
        </DialogDescription>
        <div className="flex gap-1 text-sm md:text-base">
          <p className="font-bold">Account name:</p>
          <p>{account.name}</p>
        </div>
        <Button
          className="w-full bg-red-700 hover:bg-red-600 cursor-pointer"
          disabled={isDeletePending}
          onClick={handleDeleteAccount}
        >
          {isDeletePending ? <Loader className="animate-spin" /> : "Delete"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDeleteDialog;
