import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { TransactionAccount } from "@/types";

import { Banknote } from "lucide-react";
import AccountDialog from "./AccountDialog";

const AccountItem = ({ account }: { account: TransactionAccount }) => {
  return (
    <Dialog>
      <DialogTrigger className="account-item button-hover">
        <Banknote className="account-icon" />
        <p>{account.name}</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
        </DialogHeader>
        <AccountDialog account={account} />
      </DialogContent>
    </Dialog>
  );
};

export default AccountItem;
