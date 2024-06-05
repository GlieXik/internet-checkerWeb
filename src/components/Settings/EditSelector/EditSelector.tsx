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
import { forwardRef, useState } from "react";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";

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
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [optionToDelete, setOptionToDelete] = useState<SelectIp>({
    value: "",
    label: "",
  });

  const listSavedSelections = JSON.parse(
    localStorage.getItem("selects") || "[]"
  );

  const initial =
    listSavedSelections.length > 0 ? listSavedSelections[0].options : [];

  const [options, setOptions] = useState<SelectIp[]>(initial);

  const handleDeleteSelection = (index: number) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions.splice(index, 1);
      return newOptions;
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOptions(initial);
    setOpen(false);
  };

  const handleSave = (options: SelectIp[]) => {
    localStorage.setItem(
      "selects",
      JSON.stringify([{ label: "Previously Selected", options }])
    );
    setOpen(false);
  };
  const confirmDelete = () => {
    handleDeleteSelection(options.indexOf(optionToDelete));
    setConfirmOpen(false);
  };
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
      >
        <AppBar sx={{ position: "relative" }}>
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
            <Button
              autoFocus
              color="inherit"
              onClick={() => handleSave(options)}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {options.map((option, index) => (
            <>
              <ListItem key={index}>
                <ListItemText primary={option.value} secondary={option.label} />
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
            </>
          ))}
          <ConfirmDialog
            title="Delete Post?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={confirmDelete}
          >
            Are you sure you want to delete this post?
          </ConfirmDialog>
        </List>
      </Dialog>
    </>
  );
};
