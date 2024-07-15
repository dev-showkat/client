import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createItem,
  handleDialog,
  setItem,
  updateItem,
} from "../slices/itemSlice";
import * as yup from "yup";
import { useEffect } from "react";

const validationSchema = yup.object({
  name: yup
    .string("Enter item name")
    .min(3, "Item name must be at least 3 characters long")
    .trim()
    .required("Item name is required"),
  description: yup
    .string("Enter item description")
    .min(3, "Item name must be at least 3 characters long")
    .max(100, "Item name must be at maximum 100 characters long")
    .trim()
    .required("Item description is required"),
});

function SaveItemScreen() {
  const { isDialogOpen, loading, selectedItem } = useSelector(
    (state) => state.items
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (selectedItem) {
        dispatch(updateItem({ id: selectedItem._id, item: values }));
      } else {
        dispatch(createItem(values));
      }
      onClose();
    },
  });

  useEffect(() => {
    if (selectedItem) {
      const { name, description } = selectedItem || {};
      formik.setValues({
        name,
        description,
      });
    } else {
      formik.setValues({
        name: "",
        description: "",
      });
    }
  }, [selectedItem]);

  const onClose = () => {
    dispatch(handleDialog(false));
    dispatch(setItem(null));
    formik.resetForm();
  };

  return (
    <Dialog
      open={isDialogOpen}
      keepMounted
      onClose={() => dispatch(handleDialog(false))}
      aria-describedby="add-item"
    >
      <DialogTitle> {selectedItem ? "Update Item" : "Add Item"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            multiline
            maxRows={4}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            margin="normal"
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SaveItemScreen;
