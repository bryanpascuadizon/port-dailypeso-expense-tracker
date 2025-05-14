const MonthlyTransactionItem = ({ month }: { month: string }) => {
  console.log("Month: ", month);
  return (
    <div className="p-3">
      <p>{month}</p>
    </div>
  );
};

export default MonthlyTransactionItem;
