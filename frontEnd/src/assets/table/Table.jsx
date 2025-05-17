export const Table = ({ children, className }) => {
  return (
    <>
      <table className={`w-full table-auto border-t border-gray-200 min-w-[600px] ${className}`}>
        {children}
      </table>
    </>
  );
};

export const ThRow = ({ children, className }) => {
  return (
    <>
      <tr className={`text-sm font-medium text-white text-nowrap border border-gray-200 bg-blue-10 ${className}`}>
        {children}
      </tr>
    </>
  );
};

export const TableCell = ({ children, isHeader = false, className,etat,colSpan }) => {
  const CellTag = isHeader ? "th" : "td";
  return (
    <>
      <CellTag colSpan={colSpan} className={`border-r text-start border-gray-200 px-4 py-3 text-gray-800 ${className}`}>
        {children}
      </CellTag>
    </>
  );
};
