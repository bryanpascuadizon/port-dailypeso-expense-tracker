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
import DailyTransactionAddItem from "./DailyTransactionAddItem";
import { Loader, PlusIcon } from "lucide-react";

const DailyTransactionDialog = () => {
  const { userAccounts, isPendingUserAccounts } = useAccounts();

  const [openDialog, setOpenDialog] = useState(false);
  const [defaultTab, setDefaultTab] = useState("");
  const tabs = {
    TRANSACTION: "transaction",
    ACCOUNTS: "accounts",
  };

  useEffect(() => {
    if (!userAccounts?.accounts?.length) {
      setDefaultTab(tabs.ACCOUNTS);
    } else {
      setDefaultTab(tabs.TRANSACTION);
    }
  }, [userAccounts, tabs.TRANSACTION, tabs.ACCOUNTS]);

  const handleDialogChange = (isOpen: boolean) => {
    setOpenDialog(isOpen);
  };

  return (
    userAccounts?.accounts && (
      <Dialog open={openDialog} onOpenChange={handleDialogChange}>
        <DialogTrigger
          aria-label="Add Transaction"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500 w-13 h-13 md:w-15 md:h-15 flex items-center justify-center"
        >
          <PlusIcon className="w-8 h-8 md:w-10 md:h-10 cursor-pointer" />
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle className="text-base md:text-lg font-bold">
              Add Transaction
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <Tabs defaultValue={defaultTab} value={defaultTab}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger
                value={tabs.ACCOUNTS}
                className="flex gap-3 cursor-pointer"
                onClick={() => setDefaultTab(tabs.ACCOUNTS)}
              >
                <p className="">1</p>
                <p>New Account</p>
              </TabsTrigger>
              <TabsTrigger
                value={tabs.TRANSACTION}
                className="flex gap-3 cursor-pointer"
                disabled={!userAccounts.accounts.length}
                onClick={() => setDefaultTab(tabs.TRANSACTION)}
              >
                {isPendingUserAccounts ? (
                  <Loader />
                ) : (
                  <>
                    {" "}
                    <p className="">2</p>
                    <p>New Transaction</p>
                  </>
                )}
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
              <DailyTransactionAddItem
                userAccounts={userAccounts.accounts}
                setOpenDialog={setOpenDialog}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    )
  );
};

export default DailyTransactionDialog;
