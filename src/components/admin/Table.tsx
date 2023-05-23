import { useContext } from "react";
import { AdminDataContext } from "~/context/adminContext";
import { OrderLine, headerType } from "~/hooks/admin/helper";

interface Row {
  row: OrderLine;
  handleClick: (e: any, lineID: any, type: string, from: string) => void;
}
const Row = ({ row, handleClick }: Row) => {
  const { headers } = useContext(AdminDataContext);
  // console.log({ headers, appData });
  return (
    <div
      key={JSON.stringify(row)}
      className="flex h-1/6 w-full flex-row-reverse items-center p-2 text-center  text-5xl text-white shadow-lg "
    >
      {Object.values(row).map((cell: string, index: number) => {
        if (headers && headers[index]?.toShow) {
          return (
            <p key={index} className="z-50 w-1/3 text-center text-[8px]">
              {cell}
            </p>
          );
        }
      })}
      {row.status != "במטריצה" && (
        <button
          onClick={(e) => handleClick(e, row.rowID, "במטריצה", "row")}
          className="w-1/3 bg-green-400 text-[8px] font-bold text-black"
        >
          למטריצה
        </button>
      )}
      {row.status != "למחוק" && (
        <button
          onClick={(e) => handleClick(e, row.rowID, "למחוק", "row")}
          className="w-1/3 bg-red-400 text-[8px]"
        >
          למחוק
        </button>
      )}
      {row.status != "ללא" && (
        <button
          onClick={(e) => handleClick(e, row.rowID, "ללא", "row")}
          className="w-1/3 bg-blue-300 text-[8px] font-bold  text-gray-700"
        >
          איפוס
        </button>
      )}
    </div>
  );
};

const TableData = (props: any) => {
  // console.log("in table component", { headers });
  return (
    <div className="h-full border-2 border-gray-600">
      {props.data &&
        props.data.map((row: OrderLine, index: number) => {
          console.log("props type", props.type);
          if (props.type == "הכל")
            return (
              <Row
                key={index + row.date}
                row={row}
                handleClick={props.handleClick}
              />
            );
          if (props.type == row.status) {
            return (
              <Row
                key={index + row.date}
                row={row}
                handleClick={props.handleClick}
              />
            );
          }
        })}
    </div>
  );
};

export default TableData;
