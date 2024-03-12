import DataGrid from "./components/DataGrid";
import { GridColDef, row } from "./interfaces";
import './App.css'
import Search from "./components/common/Search";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    type: "text",
    editable: false,
    description: "",
    sortable: false,
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
    type: "text",
    description: "",
    sortable: false,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
    type: "text",
    description: "",
    sortable: false,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
    description: "",
    sortable: false,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    editable: false,
    type: "",
  },
];

const rows: row[] = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const App = () => {
  return <div>
    <Search />
    <DataGrid rows={rows} colomns={columns} />
  </div>
};

export default App;
