import { TransactionAccount } from "@/types";

const AccountItem = ({ account }: { account: TransactionAccount }) => {
  return (
    <div className="rounded-sm bg-white p-1 text-xs md:text-sm mb-1 shadow">
      <p>{account.name}</p>
    </div>
  );
};

export default AccountItem;
