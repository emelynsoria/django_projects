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

import { addExperience } from "../common-components/include/requests";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: "",
      description: "",
      location: "",
      dateFrom: "",
      dateTo: ""
    };
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  submitData = () => {
    addExperience(
      this.state.jobTitle,
      this.state.description,
      this.state.location,
      this.state.dateFrom,
      this.state.dateTo,
      this.props.userId
    ).then(window.location.reload(true));
  };

  render() {
    const { classes, open, onClose, userId } = this.props;

    return (
      <React.Fragment>
        <Dialog
          // maxWidth="md"
          open={open}
          onClose={onClose}
        >
          <React.Fragment>
            <DialogTitle className={classes.dialogTitle}>
              Add Work Experience
              <IconButton className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Job Title"
                    variant="outlined"
                    value={this.state.jobTitle}
                    onChange={e =>
                      this.handleChange("jobTitle", e.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    multiline
                    label="Description"
                    rowsMax={20}
                    value={this.state.description}
                    onChange={e =>
                      this.handleChange("description", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Location/Company"
                    value={this.state.location}
                    onChange={e =>
                      this.handleChange("location", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    margin="normal"
                    label="Date (from)"
                    type="month"
                    variant="outlined"
                    fullWidth
                    value={this.state.dateFrom}
                    onChange={e =>
                      this.handleChange("dateFrom", e.target.value)
                    }
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
                    label="Date (to)"
                    variant="outlined"
                    fullWidth
                    value={this.state.dateTo}
                    onChange={e => this.handleChange("dateTo", e.target.value)}
                    InputLabelProps={{
                      shrink: true
                    }}
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
                    this.state.description &&
                    this.state.dateFrom &&
                    this.state.dateTo
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

export default withStyles(uiStyles)(AddExperience);
