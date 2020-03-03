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
import clsx from "clsx";
import { img } from "../common-components/include/css";
import { displayImage } from "../common-components/include/exports";
import { addSkill } from "../common-components/include/requests";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  imgSize: {
    maxHeight: "27em"
  },
  img
});

class AddSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: "",
      details: "",
      photo: ""
    };
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    });
  };

  changePhoto = e => {
    const preview = document.getElementById("imageOutput");
    const file = document.querySelector("input[type=file]").files[0];
    displayImage(preview, file); // function to display image selected

    this.setState({
      photo: e.target.files[0]
    });
  };

  submitData = () => {
    const decoded_id = jwt.decode(localStorage.getItem("token"));

    let formData = new FormData();
    formData.append("user", decoded_id.user_id);
    formData.append("skill", this.state.skill);
    formData.append("skill_details", this.state.details);
    formData.append("skill_photo", this.state.photo);

    addSkill(formData)
      .then(res => {
        console.log("new skill", res);
      })
      .then(() => window.location.reload(true));
  };

  render() {
    const { classes, open, onClose } = this.props;

    return (
      <React.Fragment>
        <Dialog
          fullScreen={window.innerWidth < 760 ? true : false}
          fullWidth={true}
          // maxWidth="md"
          open={open}
          onClose={onClose}
        >
          <React.Fragment>
            <DialogTitle className={classes.dialogTitle}>
              Add Skill
              <IconButton className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Skill"
                    variant="outlined"
                    onChange={e => this.handleChange("skill", e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Details"
                    multiline
                    rowsMax={25}
                    onChange={e => this.handleChange("details", e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs>
                  <center>
                    <img
                      alt="skill photo"
                      id="imageOutput"
                      className={clsx(classes.img, classes.imgSize)}
                      src={this.state.photo}
                    />
                  </center>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <input
                    type="file"
                    accept="image/*"
                    name="skill_photo"
                    // multiple
                    onChange={e => this.changePhoto(e)}
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
                disabled={!this.state.skill}
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

export default withStyles(uiStyles)(AddSkill);
