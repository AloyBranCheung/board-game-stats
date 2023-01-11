import { useState } from "react";
// react-query
import useUpdateSingleUser from "src/react-query/useUpdateSingleUser";
import useAddNewUser from "src/react-query/useAddNewUser";
import useDeleteUser from "src/react-query/useDeleteUser";
// react-hook-form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// custom hooks
import useFirebaseUserDb from "src/hooks/useFirebaseUserDb";
// components
import AlertDialog from "src/components/UI/AlertDialog";
import PrimaryButton from "src/components/UI/PrimaryButton";
import Input from "src/components/UI/form-components/Input";
import TableCRUDActions from "src/components/UI/Tables/TableCRUDActions";
// Material React Table
import MaterialReactTable, {
  MRT_Row,
  MaterialReactTableProps,
} from "material-react-table";
import { userTableColumns } from "src/components/ManageStatsContainer/Users/config";
// types
import { z } from "zod";
import { User, UserList, UserObj } from "src/@types/UserTypes";
import { createNewUserSchema } from "src/validators/UserValidation";

interface UserTableProps {
  data: UserList;
}

export default function UserTable({ data }: UserTableProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof createNewUserSchema>>({
    resolver: zodResolver(createNewUserSchema),
    defaultValues: {
      name: "",
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isError } = useFirebaseUserDb();
  const { mutate: createNewUser } = useAddNewUser();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateSingleUser } = useUpdateSingleUser();

  // save row edits
  const handleRowEditSave: MaterialReactTableProps<User>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      const _id = row.original._id.toString();
      // update backend
      await updateSingleUser({
        _id,
        value: { ...row.original, ...values } as UserObj,
      });

      //required to exit editing mode and close modal
      exitEditingMode();
    };

  // create new row
  const handleCreateNewUser = async (
    data: z.infer<typeof createNewUserSchema>
  ) => {
    // mutate
    await createNewUser(data);
    setIsDialogOpen(false);
    reset();
  };

  // delete row
  const handleDeleteRow = async (row: MRT_Row<User>) => {
    await deleteUser(row.original._id.toString());
  };

  return (
    <>
      <MaterialReactTable
        columns={userTableColumns}
        data={data}
        enableEditing
        onEditingRowSave={handleRowEditSave}
        renderRowActions={({ row, table }) => (
          <TableCRUDActions
            row={row}
            table={table}
            handleDeleteRow={() => handleDeleteRow(row)}
          />
        )}
        renderTopToolbarCustomActions={() => (
          <PrimaryButton onClick={() => setIsDialogOpen(true)}>
            Create New User
          </PrimaryButton>
        )}
      />

      <AlertDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        dialogTitle="Create a new user"
        onCancelButtonClick={() => setIsDialogOpen(false)}
        cancelButtonText="Nevermind"
        acceptButtonText="Accept"
        acceptButtonType="submit"
        onSubmit={handleSubmit(handleCreateNewUser)}
      >
        <Input
          control={control}
          label="Name"
          isError={
            typeof errors.name?.message === "string" || (isError && true)
          }
          errorMessage={errors.name?.message}
          name="name"
        />
      </AlertDialog>
    </>
  );
}
