import { useState } from "react";
// components
import TableCRUDActions from "src/components/UI/Table/TableCRUDActions";
// Material React Table
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";

interface UserTableProps {
  data: { [key: string | number]: any }[];
  columns: MRT_ColumnDef<{}>[];
  onEditingRowSave: ({
    exitEditingMode,
    row,
    table,
    values,
  }) => Promise<void> | void;
}

export default function UserTable({ data, columns }: UserTableProps) {
  return (
    <>
      <MaterialReactTable
        columns={columns}
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
