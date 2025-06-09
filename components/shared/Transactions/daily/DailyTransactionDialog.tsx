"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import useAccounts from "@/lib/hooks/useAccounts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyTransactionAccount from "./DailyTransactionAccount";
import { PenLine, PlusIcon } from "lucide-react";
import DailyTransactionAddEditForm from "./DailyTransactionAddEditForm";
import { tabs } from "@/lib/constants";
import { Transactions } from "@/types";

interface DailyTranasctionDialogProps {
  transaction?: Transactions;
  toEdit?: boolean;
}

const DailyTransactionDialog = ({
  transaction,

  toEdit,
}: DailyTranasctionDialogProps) => {
  const { userAccounts } = useAccounts();

  const [openDialog, setOpenDialog] = useState(false);
  const [defaultTab, setDefaultTab] = useState("");

  useEffect(() => {
    if (!userAccounts?.accounts?.length) {
      setDefaultTab(tabs.ACCOUNTS);
    } else {
      setDefaultTab(tabs.TRANSACTION);
    }
  }, [userAccounts]);

  const handleDialogChange = (isOpen: boolean) => {
    setOpenDialog(isOpen);
  };

  return (
    userAccounts?.accounts && (
      <Dialog open={openDialog} onOpenChange={handleDialogChange}>
        <DialogTrigger
          aria-label={toEdit ? "Edit Transaction" : "Add Transaction"}
          className={
            !toEdit
              ? "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500 w-13 h-13 md:w-15 md:h-15 flex items-center justify-center"
              : ""
          }
        >
          {toEdit ? (
            <PenLine className="cursor-pointer text-green-700" />
          ) : (
            <PlusIcon className="w-8 h-8 md:w-10 md:h-10 cursor-pointer" />
          )}
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle className="text-base md:text-lg font-bold text-yellow-500">
              {toEdit ? "Edit" : "Add"} transaction
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <Tabs defaultValue={defaultTab} value={defaultTab}>
            <TabsList className="w-full flex items-center">
              <TabsTrigger
                value={tabs.ACCOUNTS}
                className="flex gap-3 cursor-pointer text-sm md:text-base"
                onClick={() => setDefaultTab(tabs.ACCOUNTS)}
              >
                <p>New Account</p>
              </TabsTrigger>
              <TabsTrigger
                value={tabs.TRANSACTION}
                className="flex gap-3 cursor-pointer text-sm md:text-base"
                disabled={!userAccounts.accounts.length}
                onClick={() => setDefaultTab(tabs.TRANSACTION)}
              >
                <p>{!toEdit && "New"} Transaction</p>
              </TabsTrigger>
            </TabsList>
            <TabsContent value={tabs.ACCOUNTS}>
              <DailyTransactionAccount
                accounts={userAccounts.accounts}
                setDefaultTab={setDefaultTab}
                tabs={tabs}
              />
            </TabsContent>
            <TabsContent value={tabs.TRANSACTION}>
              {toEdit ? (
                <DailyTransactionAddEditForm
                  transaction={transaction}
                  userAccounts={userAccounts.accounts}
                  toEdit
                  setOpenDialog={setOpenDialog}
                />
              ) : (
                <DailyTransactionAddEditForm
                  userAccounts={userAccounts.accounts}
                  setOpenDialog={setOpenDialog}
                />
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    )
  );
};

export default DailyTransactionDialog;
