import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TransactionAccount } from "@/types";

const AccountDialog = ({ account }: { account: TransactionAccount }) => {
  return (
    <div>
      <form>
        <input type="hidden" name="id" value={account.id} />
        <input type="hidden" name="userId" value={account.userId} />
        <Input
          className="daily-form-item"
          type="text"
          id="name"
          name="name"
          defaultValue={account.name}
        />
        <Button className="w-full bg-orange-500 hover:bg-orange-400 cursor-pointer">
          Edit
        </Button>
      </form>
    </div>
  );
};

export default AccountDialog;
