import { HandCoins } from "lucide-react";

const NoData = () => {
  return (
    <div className="w-full py-10 text-center text-gray-700">
      <HandCoins className="w-20 h-20  m-auto  mb-5" />
      <p className="text-sm">No data available</p>
    </div>
  );
};

export default NoData;
