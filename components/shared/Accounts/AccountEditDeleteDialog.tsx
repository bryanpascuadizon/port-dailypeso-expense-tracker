import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { editUserAccount } from "@/lib/actions/account-actions";
import { TransactionAccount } from "@/types";

import { Loader } from "lucide-react";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import AccountDeleteDialog from "./AccountDeleteDialog";

const AccountEditDeleteDialog = ({
  account,
  refetchUserAccounts,
  setOpenDialog,
}: {
  account: TransactionAccount;
  refetchUserAccounts: () => void;
  setOpenDialog: (isOpen: boolean) => void;
}) => {
  const [state, action, isEditPending] = useActionState(editUserAccount, {
    success: false,
    message: "",
  });
  const [isDeletePending, startDeleteTransition] = useTransition();

  useEffect(() => {
    if (!state.success) {
      return;
    }

    const closeDialog = async () => {
      await refetchUserAccounts();
      state.success = false;
      setOpenDialog(false);
      toast(<p className="toast-text text-confirm">{state.message}</p>);
    };

    closeDialog();
  }, [state, state.success, refetchUserAccounts, setOpenDialog]);

  return (
    <form action={action}>
      <input type="hidden" name="accoundId" value={account.id} />
      <input type="hidden" name="userId" value={account.userId} />
      <Input
        className="daily-form-item"
        type="text"
        id="accountName"
        name="accountName"
        defaultValue={account.name}
        disabled={isEditPending || isDeletePending}
        maxLength={20}
      />
      <div className="flex gap-3 w-full">
        <div className="w-full">
          <Button
            className="w-full bg-green-700 hover:bg-green-600 cursor-pointer"
            disabled={isEditPending || isDeletePending}
            type="submit"
          >
            {isEditPending || isDeletePending ? (
              <Loader className="animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </div>

        <div className="w-full">
          <AccountDeleteDialog
            account={account}
            refetchUserAccounts={refetchUserAccounts}
            isEditPending={isEditPending}
            isDeletePending={isDeletePending}
            startDeleteTransition={startDeleteTransition}
          />
        </div>
      </div>
    </form>
  );
};

export default AccountEditDeleteDialog;
