import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmationDialog = ({ handleNo, handleYes, open = false }) => {
  return (
    <Dialog
      open={open}
      onClose={handleNo}
      aria-labelledby="confirm-delete"
      aria-describedby="confirm-delete-description"
    >
      <DialogTitle id="confirm-delete">Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-delete-description">
          Are you sure you want to delete!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNo} size="small">
          No
        </Button>
        <Button onClick={handleYes} size="small">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
