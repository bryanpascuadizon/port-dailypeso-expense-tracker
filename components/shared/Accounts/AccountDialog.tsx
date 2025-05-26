import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  deleteUserAccount,
  editUserAccount,
} from "@/lib/actions/account-actions";
import { TransactionAccount } from "@/types";
import { Loader } from "lucide-react";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";

const AccountDialog = ({
  account,
  refetchUserAccounts,
  setOpenDialog,
}: {
  account: TransactionAccount;
  refetchUserAccounts: () => void;
  setOpenDialog: (isOpen: boolean) => void;
}) => {
  const [isPendingDelete, startDeleteTransition] = useTransition();
  const [state, action, isEditPending] = useActionState(editUserAccount, {
    success: false,
    message: "",
  });

  const handleDeleteAccount = () => {
    startDeleteTransition(async () => {
      const response = await deleteUserAccount(account.id);

      if (response.success) {
        await refetchUserAccounts();
        setOpenDialog(false);
        toast(<p className="toast-text">{response.message}</p>);
      }
    });
  };

  useEffect(() => {
    if (!state.success) {
      return;
    }

    const closeDialog = async () => {
      await refetchUserAccounts();
      state.success = false;
      setOpenDialog(false);
    };

    closeDialog();
  }, [state.success, refetchUserAccounts, setOpenDialog]);

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
      />
      <div className="flex gap-3 w-full">
        <div className="w-full">
          <Button
            className="w-full bg-green-700 hover:bg-green-600 cursor-pointer"
            disabled={isPendingDelete || isEditPending}
            type="submit"
          >
            {isEditPending ? <Loader className="animate-spin" /> : "Edit"}
          </Button>
        </div>

        <div className="w-full">
          <Button
            className="w-full bg-red-700 hover:bg-red-600 cursor-pointer"
            onClick={handleDeleteAccount}
            disabled={isPendingDelete || isEditPending}
          >
            {isPendingDelete ? <Loader className="animate-spin" /> : "Delete"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AccountDialog;
