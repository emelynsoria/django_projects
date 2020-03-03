import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { confirmDelete, closeDialog, title, handleDelete } = this.props;

    return (
      <React.Fragment>
        <Dialog open={confirmDelete} onClose={closeDialog}>
          <DialogTitle>
            Are you sure you want to remove{" "}
            {title.length !== 0 ? <b>{title.toUpperCase()}</b> : "this"} ?
          </DialogTitle>
          <DialogActions>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button variant="contained" color="primary" onClick={closeDialog}>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles()(DeleteDialog);
