import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import jwt from "jsonwebtoken";
import { addAward } from "../common-components/include/requests";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const decoded_id = jwt.decode(localStorage.getItem("token"));

class AddAward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      awardTitle: "",
      awardDetail: "",
      awardDate: null
    };
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  submitData = () => {
    addAward(
      this.state.awardTitle,
      this.state.awardDetail,
      this.state.awardDate,
      decoded_id.user_id
    )
      .then(res => {
        console.log("new award", res);
      })
      .then(window.location.reload(true));
  };

  render() {
    const { classes, open, onClose } = this.props;

    return (
      <React.Fragment>
        <Dialog
          // fullWidth={fullWidth}
          // maxWidth="md"
          open={open}
          onClose={onClose}
        >
          <React.Fragment>
            <DialogTitle className={classes.dialogTitle}>
              Add Award
              <IconButton className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Title of Award"
                    variant="outlined"
                    onChange={e =>
                      this.handleChange("awardTitle", e.target.value)
                    }
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Description"
                    multiline
                    rowsMax={25}
                    onChange={e =>
                      this.handleChange("awardDetail", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Date"
                    type="date"
                    onChange={e =>
                      this.handleChange("awardDate", e.target.value)
                    }
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="primary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                onClick={this.submitData}
                disabled={this.state.awardTitle.length === 0 ? true : false}
              >
                Save
              </Button>
            </DialogActions>
          </React.Fragment>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(uiStyles)(AddAward);
