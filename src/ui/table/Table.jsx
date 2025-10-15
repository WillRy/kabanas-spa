import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider
      value={{
        columns,
      }}
    >
      <div className="border border-gray-200 text-sm bg-white rounded-md overflow-hidden">
        {children}
      </div>
    </TableContext.Provider>
  );
}

function CommowRow({ children, columns,className, ...props }) {
  return (
    <div
      className={`grid gap-4 items-center transition-none ${className}`}
      style={{ gridTemplateColumns: columns }}
      {...props}
    >
      {children}
    </div>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <CommowRow
      columns={columns}
      style={{ gridTemplateColumns: columns }}
      className="py-4 px-6 bg-gray-50 border-b border-gray-100 uppercase tracking-wide font-semibold text-gray-600"
    >
      {children}
    </CommowRow>
  );
}

function Body({ data, render }) {
  if (data.length === 0) {
    return (
      <div className="text-lg font-medium text-center m-4">
        No data to show at the moment!
      </div>
    );
  }

  return <div className="my-1.5 mx-0 divide-y divide-gray-100">{data.map(render)}</div>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <CommowRow
      columns={columns}
      style={{ gridTemplateColumns: columns }}
      className="py-3 px-6"
    >
      {children}
    </CommowRow>
  );
}

function Footer({ children }) {
  return (
    <footer className="bg-gray-50 flex justify-center py-4 px-2">{children}</footer>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
