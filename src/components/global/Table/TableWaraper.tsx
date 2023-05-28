// const L = mD[0] ? Object.values(mD[0]).length - 1 : 0;

import { useTableData } from "./TableContext";

export const getTableData = (mD: any[]) => {
  if (mD[0]) {
    const Headers = Object.keys(mD[0]);
    const Length = mD[0].length;
    const CellsData = mD.map((row) => Object.values(row));
    return { Headers, CellsData, Length };
  } else return null;
};
interface CellProps {
  data: any;
  isVisible: boolean;
  conditions?: any[] | null;
  addedStyles?: string;
  type: string;
  divType?: "checkbox" | "number" | "date" | undefined;
}
const TableCell = ({
  data,
  isVisible,

  conditions = null,
  addedStyles = "",
  type,
}: CellProps) => {
  // console.log({ Headers });
  return (
    <div className="  grid   ">
      {isVisible && type == "td" ? (
        <td className="h-full ">{data}</td>
      ) : (
        isVisible && type == "th" && <th className="">{data}</th>
      )}
      {/* <input type="" /> */}
    </div>
  );
};
type RowsProps = {
  Rows: any[][] | null;
  addedStyles?: string;
};
export const TableRows = ({ Rows, addedStyles = "" }: RowsProps) => {
  const { TableData } = useTableData();
  const rowLength = Rows && Rows[0]?.length ? Rows[0]?.length : 1;
  return (
    <tbody>
      {Rows ? (
        Rows.map((row) => (
          <tr
            className={`grid min-h-full table-auto grid-cols-6 scroll-auto text-center `}
          >
            {row.reverse().map((cell, i) => (
              <TableCell
                data={cell}
                isVisible={true}
                type="td"
                divType={
                  TableData.Headers && TableData.Headers[i] == "בוצע"
                    ? "checkbox"
                    : undefined
                }
              />
            ))}
          </tr>
        ))
      ) : (
        <h1>אין שורות</h1>
      )}
    </tbody>
  );
};

export const HeadersDiv = ({ Headers }: { Headers: string[] | null }) => (
  <thead className="sticky top-14 ">
    {Headers ? (
      <tr
        className={`z-50 grid items-center  gap-0 border-2 border-gray-100 text-center  grid-cols-${Headers.length} `}
      >
        {Headers.reverse().map((cell) => (
          <TableCell data={cell} isVisible={true} type="th" />
        ))}
      </tr>
    ) : (
      <h1>no headers...</h1>
    )}
    ;
  </thead>
);

export const FooterDiv = ({ Headers }: { Headers: string[] }) => (
  <tfoot>
    <tr
      className={`grid w-full items-center text-center grid-cols-${Headers.length} `}
    >
      {Headers.reverse().map((cell) => (
        <TableCell data={cell} isVisible={true} type="th" />
      ))}
    </tr>
    ;
  </tfoot>
);
