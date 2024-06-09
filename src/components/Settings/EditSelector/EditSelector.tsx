import { Fab, ListItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Fragment, forwardRef, useContext, useEffect, useState } from "react";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import { SelectIp } from "../../../ts/selector";
import { ActionType, SelectorContext } from "../../../context/selector.context";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export const EditSelector = () => {
  const { formState, dispatch } = useContext(SelectorContext);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [tempOptions, setTempOptions] = useState<SelectIp[]>([]);
  const [optionToDelete, setOptionToDelete] = useState<SelectIp>({
    value: "",
    label: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTempOptions(formState);
    setOpen(false);
  };

  const handleSave = () => {
    formState
      .filter((el) => !tempOptions.some((e) => e.value === el.value))
      .forEach((el) => {
        dispatch({ type: ActionType.REMOVE, payload: el });
      });
    setOpen(false);
  };
  const confirmDelete = () => {
    setTempOptions((prev) =>
      prev.filter((el) => el.value !== optionToDelete.value)
    );
    setConfirmOpen(false);
  };
  useEffect(() => {
    setTempOptions(formState);
  }, [formState]);

  return (
    <>
      <Fab aria-label="edit" sx={fabStyle} onClick={handleClickOpen}>
        <EditIcon />
      </Fab>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            bgcolor: "#050505",
          },
        }}
      >
        <AppBar sx={{ position: "relative", bgcolor: "#232D3F", color: "" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              List of selected address
            </Typography>
            <Button autoFocus color="inherit" onClick={() => handleSave()}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List
          sx={{
            color: "white",
          }}
        >
          {tempOptions.map((option, index) => (
            <Fragment key={index}>
              <ListItem
                key={index}
                sx={{
                  borderBottom: "1px solid #232D3F",
                }}
              >
                <ListItemText
                  primary={option.value}
                  secondary={option.label}
                  secondaryTypographyProps={{
                    sx: {
                      color: "gray",
                    },
                  }}
                />
                <Button
                  onClick={() => {
                    setOptionToDelete(option);
                    setConfirmOpen(true);
                  }}
                >
                  Delete
                </Button>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
          <ConfirmDialog
            title="Delete Adress?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={confirmDelete}
          >
            Are you sure you want to delete this address?
          </ConfirmDialog>
        </List>
      </Dialog>
    </>
  );
};
