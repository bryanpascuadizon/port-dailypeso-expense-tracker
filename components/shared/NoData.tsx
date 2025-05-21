import { HandCoins } from "lucide-react";

const NoData = () => {
  return (
    <div className="w-full py-10 text-center text-gray-700">
      <HandCoins className="w-18 h-18 md:w-20 md:h-20  m-auto  mb-5" />
      <p className="text-xs md:text-sm">No transactions</p>
    </div>
  );
};

export default NoData;
