import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
});

class SnackBar extends Component {
  render() {
    const { classes, open, handleClose, message, severity_type } = this.props;
    return (
      <div className={classes.root}>
        <Snackbar
          open={open}
          autoHideDuration={2500}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <Alert onClose={handleClose} severity={severity_type}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(useStyles)(SnackBar);
