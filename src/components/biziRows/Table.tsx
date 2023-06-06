import { useContext } from "react";
import { FcPhone } from "react-icons/fc";
import { AdminDataContext } from "~/context/adminContext";
import { OrderLine, headerType } from "~/hooks/admin/helper";
import { colmsNumber } from "~/pages/biziRows/[password]";
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
      className="row1 flex h-20 flex-row-reverse items-center justify-center gap-4 overflow-auto"
    >
      {Object.values(row).map((cell: string, index: number) => {
        if (headers && headers[index]?.toShow && index <= colmsNumber) {
          if (headers[index]?.replacmentName == "טלפון")
            return (
              <a href={`tel:+972${cell}`}>
                <FcPhone />
              </a>
            );
          return (
            <p key={index} className=" cell1	 text-center">
              {cell}
            </p>
          );
        }
      })}
      {row.status != "במטריצה" && (
        <button
          className={
            "cell1 h-8 rounded-md bg-green-600 text-white hover:bg-green-700"
          }
          onClick={(e) => handleClick(e, row.rowID, "במטריצה", "row")}
        >
          להפקה
        </button>
      )}
      {row.status != "למחוק" && (
        <button
          className="cell1 h-8 rounded-md bg-red-600 text-white hover:bg-red-700"
          onClick={(e) => handleClick(e, row.rowID, "למחוק", "row")}
        >
          לביטול
        </button>
      )}
      {row.status != "ללא" && (
        <button
          className="cell1 bg-gray-400 text-black hover:bg-gray-500"
          onClick={(e) => handleClick(e, row.rowID, "ללא", "row")}
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
    <div className="flex h-full flex-col border-2 border-gray-600">
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
