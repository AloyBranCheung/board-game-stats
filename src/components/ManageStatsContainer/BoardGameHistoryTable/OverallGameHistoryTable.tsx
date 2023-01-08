import { useState } from "react";
// firebase hook
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";
// react-forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "src/components/UI/form-components/Input";
import SelectReactForm from "src/components/UI/form-components/SelectReactForm";
//
import { MenuItem } from "@mui/material";
// material react table
import MaterialReactTable from "material-react-table";
// table config
import { overallGameHistoryTableColumns } from "./config";
// dayjs
import dayjs from "dayjs";
// mock data
import { DUM_OVERALL_BOARD_GAME_HISTORY_DATA } from "src/mocks/overallBoardGameHistoryMockData";
// types/validators
import { z } from "zod";
import { createNewBoardGameHistorySchema } from "src/validators/BoardGameHistoryValidation";
// components
import TableCRUDActions from "src/components/UI/Tables/TableCRUDActions";
import PrimaryButton from "src/components/UI/PrimaryButton";
import AlertDialog from "src/components/UI/AlertDialog";
import DatePicker from "src/components/UI/form-components/DatePicker";

export default function OverallGameHistoryTable() {
  const { isLoading, isError, createBoardGameHistory } =
    useFirebaseBoardGameDb();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createNewBoardGameHistorySchema),
    defaultValues: {
      datePicked: dayjs(new Date()),
      boardGame: "",
      winner: "",
      loser: "",
      comments: "",
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRowEditSave = () => {
    console.log("row save");
  };

  const handleDeleteRow = () => {
    console.log("row delete");
  };

  const handleAddHistory = (
    data: z.infer<typeof createNewBoardGameHistorySchema>
  ) => {
    const dataToSubmit = {
      ...data,
      datePicked: data.datePicked.format("YYYY-MM-DD"),
    };
    try {
      console.log(dataToSubmit);
    } catch (error) {
      console.log(dataToSubmit);
    }
  };

  return (
    <>
      <MaterialReactTable
        data={DUM_OVERALL_BOARD_GAME_HISTORY_DATA}
        columns={overallGameHistoryTableColumns}
        enableEditing
        onEditingRowSave={handleRowEditSave}
        renderRowActions={({ row, table }) => (
          <TableCRUDActions
            row={row}
            table={table}
            handleDeleteRow={handleDeleteRow}
          />
        )}
        renderTopToolbarCustomActions={() => (
          <PrimaryButton onClick={() => setIsDialogOpen(true)}>
            Add History
          </PrimaryButton>
        )}
      />
      <AlertDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        dialogTitle="Add A New Record"
        onCancelButtonClick={() => setIsDialogOpen(false)}
        cancelButtonText="Nah"
        acceptButtonText="Yah"
        acceptButtonType="submit"
        onSubmit={handleSubmit(handleAddHistory)}
      >
        <DatePicker
          name="datePicked"
          control={control}
          isError={typeof errors.datePicked?.message === "string"}
          errorMessage={
            typeof errors.datePicked?.message === "string"
              ? errors.datePicked?.message
              : undefined
          }
        />
        <SelectReactForm name="boardGame" control={control} label="Board Game">
          <MenuItem value="firebasedb">
            FirebaseDb find all users and values
          </MenuItem>
        </SelectReactForm>
        <SelectReactForm name="winner" control={control} label="Winner">
          <MenuItem value="firebasedb">
            FirebaseDb find all users and values
          </MenuItem>
        </SelectReactForm>
        <SelectReactForm name="loser" control={control} label="Loser">
          <MenuItem value="firebasedb">
            FirebaseDb find all users and values
          </MenuItem>
        </SelectReactForm>
        <Input
          name="comments"
          control={control}
          label="Comment?"
          isError={
            typeof errors.comments?.message === "string" || (isError && true)
          }
          errorMessage={errors.comments?.message}
        />
      </AlertDialog>
    </>
  );
}
