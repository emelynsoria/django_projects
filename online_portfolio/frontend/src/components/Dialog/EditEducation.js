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
  getEducationDetails,
  updateEducation
} from "../common-components/include/requests";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

class EditEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school_id: "",
      schoolName: "",
      schoolDuration: "",
      durationFrom: "",
      durationTo: "",
      schoolDescription: "",
      schoolType: null
    };
  }

  componentWillMount() {
    this.setState({
      school_id: this.props.schoolId
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.schoolId !== prevProps.schoolId) {
      this.setState({
        school_id: this.props.schoolId
      });
      this.fetchData(this.props.schoolId);
    }
  }

  fetchData(educId) {
    getEducationDetails(educId).then(res => {
      this.setState({
        schoolName: res.school_name,
        durationFrom: res.school_duration.split(" – ")[0],
        durationTo: res.school_duration.split(" – ")[1],
        schoolType: res.school_type,
        schoolDescription: res.school_description
      });
    });
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  submitData = () => {
    updateEducation(
      this.state.school_id,
      this.state.schoolName,
      this.state.durationFrom,
      this.state.durationTo,
      this.state.schoolType,
      this.state.schoolDescription
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
            Edit Education
            <IconButton className={classes.closeButton} onClick={closeEdit}>
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
                  value={this.state.schoolType}
                  multiline
                  onChange={e =>
                    this.handleChange("schoolType", e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  margin="normal"
                  type="number"
                  label="From"
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
                  value={this.state.schoolDescription}
                  multiline
                  rowsMax={20}
                  onChange={e =>
                    this.handleChange("schoolDescription", e.target.value)
                  }
                  variant="outlined"
                  fullWidth
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

export default withStyles(uiStyles)(EditEducation);
