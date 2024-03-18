import AdvancedDataGrid from "../components/advancedDataGrid/AdvancedDataGrid";

export type GridColDef = {
  field: string;
  headerName: string;
  width: number;
  description?: string;
  editable?: boolean;
  sortable?: boolean;
  type?: "text" | "number" | "boolean";
};

const AdvancedDataGridPage = () => {
  return (
    <div>
      <AdvancedDataGrid />
    </div>
  );
};

export default AdvancedDataGridPage;
