import { useContext } from "react";
import { AdminDataContext } from "~/context/adminContext";
import { OrderLine, headerType } from "~/hooks/admin/helper";

interface Row {
  row: OrderLine;
  handleClick: (e: any, lineID: any, type: string, from: string) => void;
}
const Row = ({ row, handleClick }: Row) => {
  const { appData, headers } = useContext(AdminDataContext);
  // console.log({ headers, appData });
  return (
    <div className="flex w-full flex-row-reverse text-5xl text-white  ">
      {Object.values(row).map((cell: string, index: number) => {
        if (headers && headers[index]?.toShow) {
          return <p className="z-50 w-1/6 text-[8px]">{cell}</p>;
        }
      })}
      {row.status != "במטריצה" && (
        <button
          onClick={(e) => handleClick(e, row.rowID, "במטריצה", "row")}
          className="w-1/6 bg-green-400 text-[8px] font-bold text-black"
        >
          למטריצה
        </button>
      )}
      {row.status != "למחוק" && (
        <button
          onClick={(e) => handleClick(e, row.rowID, "למחוק", "row")}
          className="w-1/6 bg-red-400 text-[8px]"
        >
          למחוק
        </button>
      )}
      {row.status != "לא מויינו" && (
        <button
          onClick={(e) => handleClick(e, row.rowID, "לא מויינו", "row")}
          className="w-1/6 bg-blue-300 text-[8px] font-bold  text-gray-700"
        >
          איפוס
        </button>
      )}
    </div>
  );
};

const TableData = (props: any) => {
  const { headers } = useContext(AdminDataContext);

  // console.log("in table component", { headers });
  return (
    <>
      {props.data &&
        props.data.map((row: any, index: number) => {
          console.log("props type", props.type);
          if (props.type == "הכל")
            return <Row row={row} handleClick={props.handleClick} />;
          if (props.type == row.status) {
            return <Row row={row} handleClick={props.handleClick} />;
          }
        })}
    </>
  );
};

export default TableData;
