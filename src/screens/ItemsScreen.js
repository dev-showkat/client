import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  fetchItems,
  handleDialog,
  setItem,
} from "../slices/itemSlice";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { Edit, Add, Delete } from "@mui/icons-material/";
import ConfirmationDialog from "../components/ConfirmationDialog";
import SaveItemScreen from "./SaveItemScreen";

const ItemsScreen = () => {
  const { items, loading, isDialogOpen } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [id, setId] = useState(undefined);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleOnMouseOver = (id) => {
    setId(id);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const openDialog = (item) => {
    dispatch(setItem(item));
    dispatch(handleDialog(true));
  };

  const handleNo = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleYes = () => {
    dispatch(deleteItem(selectedItem._id));
    setOpen(false);
  };

  return (
    <>
      {!isDialogOpen || <SaveItemScreen />}
      <ConfirmationDialog
        open={open}
        handleNo={handleNo}
        handleYes={handleYes}
      />
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container my={2}>
            <Grid item xs>
              <Grid item xs>
                <Typography variant="h5" component="h2">
                  {items.length ? "List of Items" : "Items list is Empty"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => openDialog()}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          {items?.length ? (
            <Grid container spacing={4} onMouseOut={() => setId(undefined)}>
              {items.map((item) => (
                <Grid
                  item
                  key={item._id}
                  xs={12}
                  sm={6}
                  md={4}
                  onMouseOver={() => handleOnMouseOver(item._id)}
                >
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item sm>
                          <Typography variant="h5" component="h2">
                            {item.name}
                          </Typography>
                          <Typography color="textSecondary">
                            {item.description}
                          </Typography>
                        </Grid>

                        {id === item._id ? (
                          <Grid item>
                            <Edit onClick={() => openDialog(item)} />
                            <Delete onClick={() => handleDelete(item)} />
                          </Grid>
                        ) : (
                          ""
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="80vh"
            >
              <img
                height={100}
                src="/images/empty-folder.webp"
                alt="Empty list"
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default ItemsScreen;
