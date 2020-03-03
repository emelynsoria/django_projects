import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";

import clsx from "clsx";
import { img, wordBreak } from "./include/css";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  img,
  imgSize: {
    maxHeight: "50em",
    width: "auto",
    maxWidth: "100%"
  },
  wordBreak,
  title: {
    margin: "0 4% 0 0"
  },
  textContent: {
    textAlign: "center",
    margin: "3% 10% 0 10%"
  }
});

class ProjectDetails extends Component {
  render() {
    const {
      classes,
      open,
      onClose,
      projTitle,
      projDescription,
      projPhoto
    } = this.props;

    return (
      <Dialog fullWidth={true} fullScreen open={open} onClose={onClose}>
        <React.Fragment>
          <DialogTitle className={clsx(classes.wordBreak, classes.title)}>
            {projTitle.toUpperCase()}
          </DialogTitle>
          <IconButton className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <center>
                  <img
                    className={clsx(classes.imgSize, classes.img)}
                    src={projPhoto}
                  />
                </center>
                <DialogContentText className={classes.textContent}>
                  {projDescription.split("\n").map((row, id) => (
                    <p key={id}>{row}</p>
                  ))}
                </DialogContentText>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions></DialogActions>
        </React.Fragment>
      </Dialog>
    );
  }
}

export default withStyles(uiStyles)(ProjectDetails);
