import React from "react";
// mui
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dialogTitle: string;
  dialogContentText?: string;
  children?: React.ReactNode;
  onCancelButtonClick: () => void;
  onAcceptButtonClick?: () => void;
  onSubmit?: () => void;
  cancelButtonText: string;
  acceptButtonText: string;
  acceptButtonType?: "button" | "submit" | "reset" | undefined;
}

export default function AlertDialog({
  isOpen,
  onClose,
  dialogTitle,
  dialogContentText,
  onCancelButtonClick,
  onAcceptButtonClick,
  cancelButtonText,
  acceptButtonText,
  children,
  acceptButtonType,
  onSubmit,
}: AlertDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          {dialogContentText && (
            <DialogContentText>{dialogContentText}</DialogContentText>
          )}
          {children && children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancelButtonClick}>{cancelButtonText}</Button>
          <Button type={acceptButtonType} onClick={onAcceptButtonClick}>
            {acceptButtonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
