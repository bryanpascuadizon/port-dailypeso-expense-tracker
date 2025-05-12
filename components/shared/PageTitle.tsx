const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="text-center py-1 mb-5">
      <p className="text-xl">{title}</p>
    </div>
  );
};

export default PageTitle;
