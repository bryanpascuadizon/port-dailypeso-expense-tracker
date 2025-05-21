import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Transactions } from "@/types";
import { Loader, PenLine } from "lucide-react";
import { useTransition } from "react";

const DailyTransactionEditItem = ({
  transaction,
  refetchDailyTransactions,
}: {
  transaction: Transactions;
  refetchDailyTransactions: () => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const handleEditTransaction = () => {
    startTransition(async () => {
      console.log(transaction);
      await refetchDailyTransactions();
    });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <PenLine className="cursor-pointer text-green-700" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle className="font-bold">Edit Transaction</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mb-3"></DialogDescription>
          <div className="text-sm mb-2"></div>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-full bg-green-700 hover:bg-green-600 text-white cursor-pointer"
            onClick={handleEditTransaction}
          >
            {isPending ? <Loader className="animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DailyTransactionEditItem;
