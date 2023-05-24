import axios from "axios";
import { OrderLine } from "./helper";

const baseDbUrl = "http://localhost:4000/";

// const baseDbUrl = "https://bizmod-database-server.onrender.com/";
const set_ui_data = (
  itemsNames: string[],

  cells_data: any[],
  castumersData: any[]
) => {
  const uiItemsNames = [
    "שם לקוח",
    "מזהה",
    "טלפון",
    [...itemsNames],
    "סוג מסמך",
    "איסוף",
    "מאושר",
    "מידע למסמך",
    "",
  ];
  let changesMatrix: any;
  cells_data.forEach((row) => {
    let r: any = [];
    row.forEach(() => {
      r.push(null);
    });
    changesMatrix.push(r);
  });
  const itemsLables = itemsNames.map((name) => ({
    value: name,
    label: name,
  }));
  const castumersLines = castumersData.map((c, i) => [
    ...c,
    ...cells_data[i],
    1,
    0,
    0,
    0,
    0,
  ]);
  const joinedUiLines = [...uiItemsNames, ...castumersLines];

  return [joinedUiLines, changesMatrix, , itemsLables];
};

const set_cells_data = (itemsNames: string[], data: OrderLine[]) => {
  let protoType: any = {};
  let CellsData: any[] = [];
  let castumers: any;
  itemsNames.forEach((name) => (protoType[name] = 0));
  let currentID: any = null;
  let currentObj: any = { ...protoType };
  const n = data[0]?.product_name;
  if (n) {
    castumers.push([
      data[0]?.castumer_name,
      data[0]?.castumer_ID,
      data[0]?.phone,
    ]);
    currentObj[n] += 1;
  }
  for (let i = 1; i <= data.length - 1; i++) {
    let newID = data[i]?.castumer_ID;
    if (newID != currentID) {
      castumers.push(
        castumers.push([
          data[i]?.castumer_name,
          data[i]?.castumer_ID,
          data[i]?.phone,
        ])
      );
      CellsData.push(currentObj);
      currentObj = { ...protoType };
    }
    let pName = data[i]?.product_name;
    if (pName) {
      protoType[pName] += 1;
    }
  }
  const cD = CellsData.map((row) => Object.values(row));

  return { cD, castumers };
};

const make_matrix_data = (data: OrderLine[]) => {
  let itemsNames: any;
  let ActionID: any[] = [];
  let AccountKey: any = [];
  let DocumentID: any[] = [];
  let ActionAutho: string[] = [];
  let itemsHeaders: any;

  data = data.sort(
    (a, b) =>
      parseInt(a.castumer_ID.toString()) - parseInt(b.castumer_ID.toString())
  );
  for (let i = 0; i <= data.length - 1; i++) {
    if (!data[i]) continue;
    itemsNames.push(data[i]?.product_name);
    ActionID.push(data[i]?.actionID);
    AccountKey.push(data[i]?.castumer_ID);
    DocumentID.push(1);
    ActionAutho.push("Default");
    itemsHeaders.push(data[i]?.product_ID);
  }

  itemsNames = new Set(itemsNames);
  AccountKey = new Set(AccountKey);
  itemsHeaders = new Set(itemsHeaders);
  const { cD, castumers } = set_cells_data(itemsNames, data);
  const ui_data = set_ui_data(itemsNames, cD, castumers);
  return {};
};
// [matrixData, matrixComments, selectedProducts, balanceTableData]

export const saveMatrix = async (matrix: any) => {
  const date = new Date().toLocaleString("en", {
    timeZone: "Asia/Jerusalem",
  });
  const options = {
    url: baseDbUrl + "api/savematrix",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      Date: date,
      matrixName: "הזמנות אוטומטיות לתאריך " + date.toString(),
      matrixID: crypto.randomUUID(),
      isBI: false,
      isInitiated: true,
      matrixesUiData: "asdasdasdasda",
      matrixesData: {
        mainMatrix: {
          ActionID: [2, 1],
          AccountKey: ["6027", "6028"],
          //   DocumentID: [2, 6],
          //   DriverID: ["pewr1778256edrf", "1afavsdf%fbn<46"],
          ActionAutho: ["Default", "Default"],
          itemsHeaders: ["HI250SA", "SX250SA", "AB500SA", "XR100SA"],
          itemsNames: ["הרנה 250 גרם", "גת SPXP", "אבו מיסמר גדול", "גת XR"],
          cellsData: [
            [1, 0, 0, 0],
            [0, 2, 0, 0],
          ],
        },
      },
    },
  };

  return await axios(options)
    .then((response) => {
      console.log(response.data);
      response.data;
    })
    .catch((err) => console.log({ err }));
};

// {
//     "status": "yes",
//     "data": [
//         {
//             "_id": "64628a170dc2de1ac77fb979",
//             "Date": "2023-05-15T22:36:21.000Z",
//             "matrixID": "e1f93221691f84505b95627f7818be3e5bc92a8c59d74de274d6c37032b66f33",
//             "matrixName": "מטריצה חדשה לבדיקה1 משוכפל_01",
//             "userID": "62fd0ceeedbc87baf3979757",
//             "matrixesData": {
//                 "mainMatrix": {
//                     "matrixID": "e1f93221691f84505b95627f7818be3e5bc92a8c59d74de274d6c37032b66f33",
//                     "ActionID": [
//                         4,
//                         4,
//                         4,
//                         4,
//                         4,
//                         4,
//                         4
//                     ],
//                     "AccountKey": [
//                         "6255",
//                         "6047",
//                         "6036",
//                         "6053",
//                         "6027",
//                         "6025",
//                         "30064"
//                     ],
//                     "DocumentID": [
//                         1,
//                         1,
//                         1,
//                         1,
//                         1,
//                         1,
//                         1
//                     ],
//                     "DriverID": [
//                         "pewr1778256edrf",
//                         "pewr1778256edrf",
//                         "pewr1778256edrf",
//                         "msgfr6_TY&*ghkjh",
//                         "msgfr6_TY&*ghkjh",
//                         "msgfr6_TY&*ghkjh",
//                         "msgfr6_TY&*ghkjh"
//                     ],
//                     "ActionAutho": [
//                         "Default",
//                         "Default",
//                         "Default",
//                         "Default",
//                         "Default",
//                         "Default",
//                         "Default"
//                     ],
//                     "itemsHeaders": [
//                         "kimbo202",
//                         "XP150",
//                         "BB100SA",
//                         "SX250BG",
//                         "SP250SA"
//                     ],
//                     "itemsNames": [
//                         "גת קימבו 200ג",
//                         "גת XP150G",
//                         "גת בייבי",
//                         "שקית לגת SPXP250",
//                         "גת SP מובחר"
//                     ],
//                     "cellsData": [
//                         [
//                             4,
//                             0,
//                             0,
//                             0,
//                             0
//                         ],
//                         [
//                             0,
//                             0,
//                             5,
//                             0,
//                             0
//                         ],
//                         [
//                             0,
//                             0,
//                             0,
//                             5,
//                             0
//                         ],
//                         [
//                             0,
//                             0,
//                             6,
//                             0,
//                             0
//                         ],
//                         [
//                             0,
//                             0,
//                             0,
//                             0,
//                             3
//                         ],
//                         [
//                             4,
//                             0,
//                             0,
//                             0,
//                             0
//                         ],
//                         [
//                             0,
//                             10,
//                             0,
//                             0,
//                             0
//                         ]
//                     ]
//                 },
//                 "changesMatrix": {
//                     "matrixConfig": null,
//                     "matrixGlobalData": null,
//                     "cellsData": [
//                         [
//                             {
//                                 "DiscountPrc": "10"
//                             },
//                             null,
//                             null,
//                             null,
//                             null
//                         ],
//                         [
//                             null,
//                             null,
//                             null,
//                             null,
//                             null
//                         ],
//                         [
//                             null,
//                             null,
//                             null,
//                             null,
//                             null
//                         ],
//                         [
//                             null,
//                             null,
//                             null,
//                             null,
//                             null
//                         ],
//                         [
//                             null,
//                             null,
//                             null,
//                             null,
//                             null
//                         ],
//                         [
//                             null,
//                             null,
//                             null,
//                             null,
//                             null
//                         ],
//                         [
//                             null,
//                             null,
//                             null,
//                             null,
//                             null
//                         ]
//                     ],
//                     "docData": [
//                         {
//                             "Phone": "333"
//                         },
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null
//                     ],
//                     "metaData": [
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null
//                     ]
//                 }
//             },
//             "matrixesUiData": "[[[\"שם לקוח\",\"מזהה\",\"טלפון\",\"גת קימבו 200ג\",\"גת XP150G\",\"גת בייבי\",\"שקית לגת SPXP250\",\"גת SP מובחר\",\"סוג מסמך\",\"איסוף\",\"מאושר\",\"מידע למסמך\",\"\"],[\"דלק ח.י היובל\",\"6255\",\"545411792\",4,0,0,0,0,1,\"pewr1778256edrf\",4,[{\"selectValue\":\"Phone\",\"inputValue\":\"333\"}],0],[\"יאנט אינג'רה\",\"6047\",\"536292765\",0,0,5,0,0,1,\"pewr1778256edrf\",4,0,0],[\"מפגש ברית שלום\",\"6036\",\"525585813\",0,0,0,5,0,1,\"pewr1778256edrf\",4,0,0],[\"המקום של שובי\",\"6053\",\"528388880\",0,0,6,0,0,1,\"msgfr6_TY&*ghkjh\",4,0,0],[\"רגע מתוק\",\"6027\",\"503303738\",0,0,0,0,3,1,\"msgfr6_TY&*ghkjh\",4,0,0],[\"תנובת השדה\",\"6025\",\"523640654\",4,0,0,0,0,1,\"msgfr6_TY&*ghkjh\",4,0,0],[\"מיו סושי-בר גדרה\",\"30064\",\"533408014\",0,10,0,0,0,1,\"msgfr6_TY&*ghkjh\",4,0,0]],[[[{\"selectValue\":\"DiscountPrc\",\"inputValue\":\"10\"}],null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null]],[{\"value\":\"גת קימבו 200ג\",\"label\":\"גת קימבו 200ג\"},{\"value\":\"גת XP150G\",\"label\":\"גת XP150G\"},{\"value\":\"גת בייבי\",\"label\":\"גת בייבי\"},{\"value\":\"שקית לגת SPXP250\",\"label\":\"שקית לגת SPXP250\"},{\"value\":\"גת SP מובחר\",\"label\":\"גת SP מובחר\"}],[[null,null,\"פריט\",\"kimbo202\",\"XP150\",\"BB100BG\",\"SX250BG\",\"SP250BG\",null,null,null,null,null],[null,null,\"במלאי\",-255,-47,-2124,-4,-1071,null,null,null,null,null],[null,null,\"בהזמנה\",8,10,11,5,3,null,null,null,null,null],[null,null,\"נותר\",-263,-57,-2135,-9,-1074,null,null,null,null,null]]]",
//             "isBI": false,
//             "isProduced": false,
//             "isInitiated": false,
//             "counter": 0,
//             "innerLog": [],
//             "createdAt": "2023-05-15T19:37:59.286Z",
//             "updatedAt": "2023-05-15T19:37:59.286Z",
//             "__v": 0
//         }
//     ]
// }

// // },
// let matrixesUiData= "[[[\"שם לקוח\",\"מזהה\",\"טלפון\",\"גת קימבו 200ג\",\"גת XP150G\",\"גת בייבי\",\"שקית לגת SPXP250\",\"גת SP מובחר\",\"סוג מסמך\",\"איסוף\",\"מאושר\",\"מידע למסמך\",\"\"],[\"דלק ח.י היובל\",\"6255\",\"545411792\",4,0,0,0,0,1,\"pewr1778256edrf\",4,[{\"selectValue\":\"Phone\",\"inputValue\":\"333\"}],0],[\"יאנט אינג'רה\",\"6047\",\"536292765\",0,0,5,0,0,1,\"pewr1778256edrf\",4,0,0],[\"מפגש ברית שלום\",\"6036\",\"525585813\",0,0,0,5,0,1,\"pewr1778256edrf\",4,0,0],[\"המקום של שובי\",\"6053\",\"528388880\",0,0,6,0,0,1,\"msgfr6_TY&*ghkjh\",4,0,0],[\"רגע מתוק\",\"6027\",\"503303738\",0,0,0,0,3,1,\"msgfr6_TY&*ghkjh\",4,0,0],[\"תנובת השדה\",\"6025\",\"523640654\",4,0,0,0,0,1,\"msgfr6_TY&*ghkjh\",4,0,0],[\"מיו סושי-בר גדרה\",\"30064\",\"533408014\",0,10,0,0,0,1,\"msgfr6_TY&*ghkjh\",4,0,0]],[[[{\"selectValue\":\"DiscountPrc\",\"inputValue\":\"10\"}],null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null]],[{\"value\":\"גת קימבו 200ג\",\"label\":\"גת קימבו 200ג\"},{\"value\":\"גת XP150G\",\"label\":\"גת XP150G\"},{\"value\":\"גת בייבי\",\"label\":\"גת בייבי\"},{\"value\":\"שקית לגת SPXP250\",\"label\":\"שקית לגת SPXP250\"},{\"value\":\"גת SP מובחר\",\"label\":\"גת SP מובחר\"}],[[null,null,\"פריט\",\"kimbo202\",\"XP150\",\"BB100BG\",\"SX250BG\",\"SP250BG\",null,null,null,null,null],[null,null,\"במלאי\",-255,-47,-2124,-4,-1071,null,null,null,null,null],[null,null,\"בהזמנה\",8,10,11,5,3,null,null,null,null,null],[null,null,\"נותר\",-263,-57,-2135,-9,-1074,null,null,null,null,null]]]",
// // "isBI": false,
