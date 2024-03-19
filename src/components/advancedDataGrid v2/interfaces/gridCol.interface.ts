import { enGender } from "../enums";

export interface inGridCod {
  field: string;
  headerName: string;
  width: number;
  type: "text" | "number" | enGender;
  editable: boolean;
  sortable: boolean;
}
