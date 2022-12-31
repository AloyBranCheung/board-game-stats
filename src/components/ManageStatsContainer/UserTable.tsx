// Material React Table
import MaterialReactTable from "material-react-table";
import { userTableColumns } from "src/components/ManageStatsContainer/config";
// types
import { UserList } from "src/@types/UserTypes";
interface UserTableProps {
  data: UserList;
}

export default function UserTable({ data }: UserTableProps) {
  return <MaterialReactTable columns={userTableColumns} data={data} />;
}
