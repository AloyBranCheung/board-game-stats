import { useState } from "react";
// jotai
import { useAtom } from "jotai";
import { userListAtom } from "src/store/UserStore";
// react-hook-form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// custom hooks
import useFirebaseDb from "src/hooks/useFirebaseDb";
import useToastErrorMessage from "src/hooks/useToastErrorMessage";
// components
import AlertDialog from "../UI/AlertDialog";
import TableCRUDActions from "../UI/Table/TableCRUDActions";
import PrimaryButton from "../UI/PrimaryButton";
import Input from "../UI/form-components/Input";
// Material React Table
import MaterialReactTable, { MRT_Row } from "material-react-table";
import { userTableColumns } from "src/components/ManageStatsContainer/config";
// types
import { z } from "zod";
import { User, UserList } from "src/@types/UserTypes";
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
  const toastErrorMessage = useToastErrorMessage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { createNewUser, deleteSingleUser, isError, readSingleUser } =
    useFirebaseDb();
  const [userList, setUserList] = useAtom(userListAtom);

  // save row edits
  const handleRowEditSave = () => {
    console.log("saved");
  };

  // create new row
  const handleCreateNewUser = async (
    data: z.infer<typeof createNewUserSchema>
  ) => {
    try {
      const newUserId = await createNewUser(data.name);
      if (newUserId) {
        const newUser: User = await readSingleUser(newUserId);
        setUserList((prev) => [...prev, newUser]);
        setIsDialogOpen(false);
        reset();
      }
    } catch (error) {
      console.error(error);
      toastErrorMessage("Something went wrong creating the user.");
    }
  };

  // delete row
  const handleDeleteRow = (row: MRT_Row<User>) => {
    deleteSingleUser(row.original._id.toString());
    userList.splice(row.index, 1);
    setUserList([...userList]);
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
