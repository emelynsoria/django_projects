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
  getAwardDetails,
  updateAward
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
      awardId: "",
      awardTitle: "",
      awardDetail: null,
      date: ""
    };
  }

  componentWillMount() {
    this.setState({
      awardId: this.props.awardId
    });
    this.fetchData(this.props.awardId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.awardId !== prevProps.awardId) {
      this.setState({
        awardId: this.props.awardId
      });
      this.fetchData(this.props.awardId);
    }
  }

  fetchData(awardId) {
    getAwardDetails(awardId).then(res => {
      this.setState({
        awardTitle: res.award_title,
        awardDetail: res.award_detail,
        date: res.award_date
      });
    });
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  submitData = () => {
    updateAward(
      this.state.awardId,
      this.state.awardTitle,
      this.state.awardDetail,
      this.state.date
    )
      .then(window.location.reload(true))
      .catch(err => console.log("ERROR", err));
  };

  render() {
    const { classes, open, handleClose } = this.props;

    return (
      <Dialog
        fullWidth={true}
        // maxWidth="md"
        open={open}
      >
        <React.Fragment>
          <DialogTitle className={classes.dialogTitle}>
            Edit Award
            <IconButton className={classes.closeButton} onClick={handleClose}>
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
                  value={this.state.awardTitle}
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
                  label="More Details..."
                  value={this.state.awardDetail}
                  multiline
                  rowsMax={20}
                  onChange={e =>
                    this.handleChange("awardDetail", e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  margin="normal"
                  type="date"
                  label="Date"
                  value={this.state.date}
                  onChange={e => this.handleChange("date", e.target.value)}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary" onClick={handleClose}>
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
