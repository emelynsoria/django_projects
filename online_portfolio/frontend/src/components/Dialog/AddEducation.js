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

import { addEducation } from "../common-components/include/requests";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolName: "",
      type: "",
      schoolDurationFrom: "",
      schoolDurationTo: ""
    };
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  submitData = () => {
    addEducation(
      this.state.schoolName,
      this.state.durationFrom,
      this.state.durationTo,
      this.state.type,
      this.state.description,
      this.props.userId
    ).then(window.location.reload(true));
  };

  render() {
    const { classes, open, onClose } = this.props;

    return (
      <React.Fragment>
        <Dialog
          // maxWidth="md"
          open={open}
          onClose={onClose}
        >
          <React.Fragment>
            <DialogTitle className={classes.dialogTitle}>
              Add Education
              <IconButton className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="School Name"
                    variant="outlined"
                    value={this.state.schoolName}
                    onChange={e =>
                      this.handleChange("schoolName", e.target.value)
                    }
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Type (e.g. Secondary; Masters, ect.)"
                    value={this.state.type}
                    onChange={e => this.handleChange("type", e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    margin="normal"
                    label="From"
                    type="number"
                    value={this.state.durationFrom}
                    onChange={e =>
                      this.handleChange("durationFrom", e.target.value)
                    }
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    required
                  />
                </Grid>
                –
                <Grid item xs={12} sm={5}>
                  <TextField
                    margin="normal"
                    label="To"
                    value={this.state.durationTo}
                    onChange={e =>
                      this.handleChange("durationTo", e.target.value)
                    }
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Description"
                    value={this.state.description}
                    multiline
                    rowsMax={20}
                    onChange={e =>
                      this.handleChange("description", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    required
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
                disabled={
                  !(
                    this.state.schoolName &&
                    this.state.durationFrom &&
                    this.state.durationTo &&
                    this.state.description
                  )
                }
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

export default withStyles(uiStyles)(AddEducation);
