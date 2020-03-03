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

import {
  getExperienceDetails,
  updateExperience
} from "../common-components/include/requests";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

class EditExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work_id: "",
      newJobTitle: null,
      newWorkDetails: "",
      newLocation: null,
      newDateFrom: "",
      newDateTo: ""
    };
  }

  componentWillMount() {
    this.setState({
      work_id: this.props.workId
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.workId !== prevProps.workId) {
      this.setState({
        work_id: this.props.workId
      });
      this.fetchData(this.props.workId);
    }
  }

  fetchData(workId) {
    getExperienceDetails(workId).then(res => {
      this.setState({
        newJobTitle: res.job_title,
        newWorkDetails: res.work_description,
        newLocation: res.location,
        newDateFrom: res.inclusive_dates.split(" – ")[0],
        newDateTo: res.inclusive_dates.split(" – ")[1]
      });
    });
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  submitData = () => {
    updateExperience(
      this.state.work_id,
      this.state.newJobTitle,
      this.state.newWorkDetails,
      this.state.newLocation,
      this.state.newDateFrom,
      this.state.newDateTo
    )
      .then(window.location.reload(true))
      .catch(err => console.log("ERROR", err));
  };

  render() {
    const { classes, open, closeEdit } = this.props;

    return (
      <Dialog
        fullWidth={true}
        // maxWidth="md"
        open={open}
      >
        <React.Fragment>
          <DialogTitle className={classes.dialogTitle}>
            Edit Work Experience
            <IconButton className={classes.closeButton} onClick={closeEdit}>
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
                  value={this.state.newJobTitle}
                  onChange={e =>
                    this.handleChange("newJobTitle", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  label="Location/Company"
                  value={this.state.newLocation}
                  onChange={e =>
                    this.handleChange("newLocation", e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  multiline
                  rowsMax={20}
                  label="Description"
                  value={this.state.newWorkDetails}
                  // value={this.state.newWorkDetails.split("\n").map(row => (
                  //   <p>{row}</p>
                  // ))}
                  onChange={e =>
                    this.handleChange("newWorkDetails", e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  margin="normal"
                  label="Date (from)"
                  // type="month"
                  variant="outlined"
                  fullWidth
                  value={this.state.newDateFrom}
                  onChange={e =>
                    this.handleChange("newDateFrom", e.target.value)
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
                  value={this.state.newDateTo}
                  onChange={e => this.handleChange("newDateTo", e.target.value)}
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary" onClick={closeEdit}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              onClick={this.submitData}
            >
              Save
            </Button>
          </DialogActions>
        </React.Fragment>
      </Dialog>
    );
  }
}

export default withStyles(uiStyles)(EditExperience);
