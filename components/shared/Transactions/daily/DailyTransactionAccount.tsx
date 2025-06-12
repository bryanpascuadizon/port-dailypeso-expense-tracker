import { Button } from "@/components/ui/button";
import { DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addUserAccounts } from "@/lib/actions/account-actions";
import { TransactionAccount } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const DailyTransactionAccount = ({
  accounts,
  setDefaultTab,
  tabs,
}: {
  accounts: TransactionAccount[];
  setDefaultTab: (defaultTab: string) => void;
  tabs: { TRANSACTION: string; ACCOUNTS: string };
}) => {
  const [state, action, isPending] = useActionState(addUserAccounts, {
    success: false,
    message: "",
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!state.success) return;

    const refetchAccounts = async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user-accounts"],
      });
      toast(
        <p className="toast-text text-confirm">Account added successfully</p>
      );
      setDefaultTab(tabs.TRANSACTION);
    };

    refetchAccounts();
  }, [state, state.success, queryClient, setDefaultTab, tabs.TRANSACTION]);

  return (
    <div>
      <DialogDescription className="">
        {!accounts.length ? (
          <>
            {" "}
            Since you do not have any accounts, add a new account before
            adding/editing a transaction. This is to categorize your daily
            transactions
          </>
        ) : (
          <>Add an account to categorize your daily transactions</>
        )}
      </DialogDescription>

      <form action={action} className="mt-3">
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
          {isPending ? <Loader className="animate-spin" /> : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default DailyTransactionAccount;
