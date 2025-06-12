"use client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { TransactionAccount } from "@/types";

import { Banknote } from "lucide-react";
import AccountEditDeleteDialog from "./AccountEditDeleteDialog";
import { useState } from "react";

const AccountItem = ({
  account,
  refetchUserAccounts,
}: {
  account: TransactionAccount;
  refetchUserAccounts: () => void;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className="account-item button-hover">
        <Banknote className="account-icon" />
        <p>{account.name}</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle className="text-green-700">Update Account</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AccountEditDeleteDialog
          account={account}
          refetchUserAccounts={refetchUserAccounts}
          setOpenDialog={setOpenDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AccountItem;
